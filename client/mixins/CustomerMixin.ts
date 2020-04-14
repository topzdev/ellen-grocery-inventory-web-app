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
    this.frontendStore.setDeleteModal({
      show: true,
      name: this.customer.firstname + " " + this.customer.lastname,
      title: "Customer"
    });

    this.processStore.setCurrentToDelete({
      deleteFunction: this.customerStore.deleteCustomer,
      id: this.customer.customer_id
    });
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
    // await this.customerStore.fetchSingleCustomer(item.customer_id!);
    // this.$router.push("customers/customer_manage");
  }

  searchCustomer(search: string) {
    this.customerStore.fetchCustomers({ search });
  }

  get customerList() {
    return this.customerStore.getCustomers;
  }

  get currentCustomer() {
    return this.customerStore.getCurrentCustomer
  }

  get customerTitle() {
    return this.isEdit ? "Edit Customer" : "Add Customer";
  }

  get isLoading() {
    if (this.customerStore.getLoading) {
      this.clearFields();
      this.frontendStore.setCustomerModal(false);
    }
    return this.customerStore.getLoading;
  }

  get modalState() {
    return this.frontendStore.customerModalState;
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
}
