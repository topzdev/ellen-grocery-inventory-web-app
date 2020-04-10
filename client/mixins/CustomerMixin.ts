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
  public isEdit: boolean = false;
  public customerStore: ICustomerModule;
  public frontendStore: IFrontendModule;
  public processStore: IProcessModule;

  public customer: ICustomer = {
    firstname: "",
    lastname: "",
    email_address: null,
    home_address: null,
    cp_no: null,
    tel_no: null,
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

  setCustomer(item: ICustomer) {
    this.isEdit = true;
    this.customer = JSON.parse(JSON.stringify(item));
  }

  setCancel() {
    this.isEdit = false;
    this.customer = {
      firstname: "",
      lastname: "",
      email_address: "",
      home_address: "",
      cp_no: "",
      tel_no: "",
    };
    // @ts-ignore
    this.$refs.manageForm.reset();
  }

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      if (this.isEdit) {
        this.updateCustomer();
      } else {
        this.addCustomer();
      }
    }
  }

  showDelete(item: ICustomer) {
    this.customer = item;
    this.frontendStore.setDeleteModal({
      show: true,
      name: this.customer.firstname + " " + this.customer.firstname,
      title: "Customer"
    });

    this.processStore.setCurrentToDelete({
      deleteFunction: this.customerStore.deleteCustomer,
      id: this.customer.customer_id
    });
  }

  async manageItem(item: ICustomer) {
    await this.customerStore.fetchSingleCustomer(item.customer_id!);
    this.$router.push("customers/customer_manage");
  }

  searchCustomer(search: string) {
    if (search.length <= 0) this.customerStore.fetchCustomers({});
    this.customerStore.searchCustomers(search);
  }

  get customerList() {
    return this.customerStore.getCustomers;
  }

  get customerTitle() {
    return this.isEdit ? "Edit Customer" : "Add Customer";
  }

  rules: Object = {
    firstname: [(v: any) => !!v || "First Name is required"],
  };
}
