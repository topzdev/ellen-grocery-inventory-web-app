import { Component, Vue } from "vue-property-decorator";
import {
  supplierStore,
  frontendStore,
  processStore,
  ISupplierModule,
  IProcessModule,
  productStore
} from "@/store";
import ISupplier from "@/interfaces/ISupplier";
import ISupplierInfo from "@/interfaces/ISupplier";
@Component
export default class SupplierInfoMixin extends Vue {
  supplierStore: ISupplierModule;
  processStore: IProcessModule;

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
  }

  manageItem(supplier: ISupplier) {
    //   ! Assignment
    console.log(supplier);
    this.$router.push("suppliers/update");
    processStore.setCurrentSupplier(supplier);
  }

  addSupplier() {
    this.supplierStore.addSupplier(this.supplier);
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

  // Rules
  rules: Object = {
    supplier_name: [(v: any) => !!v || "Supplier Name is required"],
    company_address: [(v: any) => !!v || "Company Address is required"],
    email_address: [
      (v: any) => !!v || "Email Address is required",
      (v: any) => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    tel_no: [(v: any) => !!v || "Telephone Number is required"],
    description: [
      (v: any) =>
        (v || "").length <= 99 || `A maximum of 99 characters is allowed`
    ],
    website: [
      (v: any) =>
        v.length > 0
          ? /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/.test(
              v
            ) || "Invalid website url"
          : true
    ]
  };
}
