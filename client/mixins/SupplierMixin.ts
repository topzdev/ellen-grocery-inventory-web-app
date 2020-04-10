import { Component, Vue } from "vue-property-decorator";
import {
  supplierStore,
  frontendStore,
  processStore,
  ISupplierModule,
  IProcessModule,
  productStore,
  IFrontendModule
} from "@/store";
import ISupplier from "@/interfaces/ISupplier";
import ISupplierInfo from "@/interfaces/ISupplier";
@Component
export default class SupplierMixin extends Vue {
  valid: boolean = false;
  dialog: boolean = true;
  redirect: boolean = true;
  supplierStore: ISupplierModule;
  processStore: IProcessModule;
  frontendStore: IFrontendModule;

  supplier: ISupplierInfo = {
    supplier_name: "",
    company_address: "",
    email_address: "",
    cp_no: "",
    tel_no: "",
    fax: "",
    website: "",
    description: ""
  };

  constructor() {
    super();
    this.supplierStore = supplierStore;
    this.processStore = processStore;
    this.frontendStore = frontendStore;
  }

  manageItem(supplier: ISupplier) {
    this.$router.push("suppliers/update");
    processStore.setCurrentSupplier(supplier);
  }

  addSupplier() {
    this.supplierStore.addSupplier({ supplier: this.supplier, redirect: this.redirect });
  }

  updateSupplier() {
    this.supplierStore.updateSupplier(this.supplier);
  }

  deleteItem(supplier: ISupplier) {
    frontendStore.setDeleteModal({
      show: true,
      name: supplier.supplier_name,
      title: "supplier"
    });

    processStore.setCurrentToDelete({
      deleteFunction: supplierStore.deleteSupplier,
      id: supplier.supplier_id
    });
  }

  get supplierTitle() {
    return "Add Supplier"
  }

  // Rules
  rules: Object = {
    supplier_name: [(v: string) => !!v || "Supplier Name is required"],
    company_address: [(v: string) => !!v || "Company Address is required"],
    tel_no: [(v: string) => !!v || "Telephone Number is required"],

  };
}