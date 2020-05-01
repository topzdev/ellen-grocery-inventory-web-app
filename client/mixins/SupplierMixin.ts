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
  isEdit: boolean = false;
  valid: boolean = false;
  dialog: boolean = true;
  redirect: boolean = true;
  supplierStore: ISupplierModule;
  processStore: IProcessModule;
  frontendStore: IFrontendModule;
  $refs!: { form: any }
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


  deleteSupplier(item: ISupplier) {
    frontendStore.setMessageModal({
      title: 'Delete Supplier',
      show: true,
      message: `Are you sure to delete this product ${item.supplier_name}?`,
      mode: 'question',
      yesFunction: () => {
        this.supplierStore.deleteSupplier(item.supplier_id)
      }
    })
  }

  async setSupplier(item: ISupplier) {
    if (!item) {
      this.clearFields();
      return this.isEdit = false
    };

    await this.supplierStore.fetchSingleSupplier(item.supplier_id)

    if (this.currentSupplier) {
      this.isEdit = true;
      this.supplier = JSON.parse(JSON.stringify(this.currentSupplier));
    }
  }

  clearFields() {
    this.supplier = {
      supplier_name: "",
      company_address: "",
      email_address: "",
      cp_no: "",
      tel_no: "",
      fax: "",
      website: "",
      description: ""
    }
    this.$refs.form.resetForm();
  }

  validate() {
    if (this.$refs.form.validateForm()) {
      if (this.isEdit) return this.updateSupplier();
      else this.addSupplier();
    }
  }

  addSupplier() {
    this.supplierStore.addSupplier({ supplier: this.supplier, redirect: this.redirect });
  }

  updateSupplier() {
    this.supplierStore.updateSupplier(this.supplier);
  }

  searchSupplier(search: string) {
    this.supplierStore.fetchSuppliers({ search })
  }

  closeModal() {
    this.clearFields();
    this.frontendStore.setSupplierModal(false);
  }

  get supplierTitle() {
    return this.isEdit ? "Update Supplier" : "Add Supplier"
  }

  get supplierList() {
    return this.supplierStore.suppliers;
  }

  get currentSupplier() {
    return this.supplierStore.supplier;
  }

  get isLoading() {
    if (this.supplierStore.loading) {
      this.clearFields();
      this.frontendStore.setSupplierModal(false);
    }
    return this.supplierStore.loading;
  }

  get modalState() {
    return this.frontendStore.showSupplierModal;
  }

  set modalState(show: boolean) {
    this.frontendStore.setSupplierModal(show);
  }

  rules: Object = {
    supplier_name: [(v: string) => !!v || "Supplier Name is required"],
    company_address: [(v: string) => !!v || "Company Address is required"],
    tel_no: [(v: string) => !!v || "Telephone Number is required"],

  };
}