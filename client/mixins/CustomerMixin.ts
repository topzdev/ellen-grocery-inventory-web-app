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
  valid: boolean = false;
  dialog: boolean = true;
  public isEdit: boolean = false;
  public customerStore: ICustomerModule;
  public frontendStore: IFrontendModule;
  public processStore: IProcessModule;

  public customer: ICustomer = {
    firstname: "",
    lastname: "",
    middlename: "",
    email_address: null,
    home_address: null,
    cp_no: null,
    tel_no: null,
    points: 0,
    fax: null
  };

  constructor() {
    super();
    this.customerStore = customerStore;
    this.frontendStore = frontendStore;
    this.processStore = processStore;
  }

  addCustomer() {
    this.customerStore.addCustomer(this.customer);
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
      middlename: "",
      email_address: null,
      home_address: null,
      cp_no: null,
      tel_no: null,
      points: 0,
      fax: null
    };
    // @ts-ignore
    this.$refs.manageForm.resetValidation();
  }

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      if (this.isEdit) {
        console.log("Not Editing");
        this.updateCustomer();
      } else {
        console.log("Add");
        this.addCustomer();
      }
    }
  }

  showDelete(item: ICustomer) {
    this.customer = item;
    this.frontendStore.setDeleteModal({
      show: true,
      name: this.customer.customer_id,
      title: "Customer"
    });

    this.processStore.setCurrentToDelete({
      deleteFunction: this.customerStore.deleteCustomer,
      id: this.customer.customer_id
    });
  }

  async manageItem(item: ICustomer) {
    await this.customerStore.fetchSingleCustomer(item.customer_id!);
    this.$router.push("customers/manage_customer");
  }

  searchCustomer(search: string) {
    if (search.length <= 0) this.customerStore.fetchCustomers();
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
    lastname: [(v: any) => !!v || "Last Name is required"],
    middlename: [(v: any) => !!v || "Middle Name is required"],
    points: [
      (v: any) =>
        v <= -1 || v != null || "Points cannot be empty or less than 0"
    ]
  };
}
