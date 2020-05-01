import { Vue, Component } from "vue-property-decorator";
import {
  customerStore,
  ICustomerModule,
  frontendStore,
  IFrontendModule,
  processStore,
  IProcessModule
} from "@/store";
import ICustomer from "~/interfaces/ICustomer";

@Component
export default class CustomerMixin extends Vue {
  redirect: boolean = true;
  valid: boolean = false;
  dialog: boolean = true;
  isEdit: boolean = false;
  customerStore: ICustomerModule;
  frontendStore: IFrontendModule;
  processStore: IProcessModule;
  $refs!: { form: any }
  customer: ICustomer = {
    firstname: "",
    lastname: "",
    email_address: "",
    home_address: "",
    cp_no: "",
    tel_no: "",
  };

  constructor() {
    super();
    this.customerStore = customerStore;
    this.frontendStore = frontendStore;
    this.processStore = processStore;
  }

  addCustomer() {
    this.customerStore.addCustomer({ customer: this.customer, redirect: this.redirect });
  }

  updateCustomer() {
    this.isEdit = false;
    this.customerStore.updateCustomer(this.customer);
  }

  validate(): void {
    if (this.$refs.form.validateForm()) {
      if (this.isEdit) return this.updateCustomer();
      this.addCustomer();
    }
  }

  clearFields() {
    this.customer = {
      firstname: "",
      lastname: "",
      email_address: "",
      home_address: "",
      cp_no: "",
      tel_no: "",
    };
  }

  deleteCustomer(item: ICustomer) {
    frontendStore.setMessageModal({
      title: 'Delete Customer',
      show: true,
      message: `Are you sure to delete this product ${item.fullname}?`,
      mode: 'question',
      yesFunction: () => {
        customerStore.deleteCustomer(item.customer_id)
      }
    })
  }

  async setCustomer(item: ICustomer) {
    if (!item) {
      this.clearFields();
      return this.isEdit = false
    };

    await this.customerStore.fetchSingleCustomer(item.customer_id)

    if (this.currentCustomer) {
      this.isEdit = true;
      this.customer = JSON.parse(JSON.stringify(this.currentCustomer));
    }
  }

  searchCustomer(search: string) {
    this.customerStore.fetchCustomers({ show_deleted: false, search });
  }

  get currentCustomer() {
    return this.customerStore.customer
  }

  get customerTitle() {
    return this.isEdit ? "Edit Customer" : "Add Customer";
  }

  get isLoading() {
    if (this.customerStore.loading) {
      this.clearFields();
      this.frontendStore.setCustomerModal(false);
    }
    return this.customerStore.loading;
  }

  get modalState() {
    return this.frontendStore.showCustomerModal;
  }

  get customerList() {
    return customerStore.customers;
  }

  set modalState(show: boolean) {
    this.frontendStore.setCustomerModal(show);
  }

  closeModal() {
    this.clearFields()
    this.frontendStore.setCustomerModal(false);
  }

  rules: Object = {
    firstname: [(v: any) => !!v || "First Name is required"],
  };

  created() {
    this.customerStore.fetchCustomers({ show_deleted: false })
  }

}
