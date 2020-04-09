import { Component, Vue } from "vue-property-decorator";
import {
  brandStore,
  IBrandModule,
  frontendStore,
  IFrontendModule,
  processStore,
  IProcessModule
} from "@/store";
import IBrand from "~/interfaces/IBrand";

@Component
class BrandMixin extends Vue {
  valid: boolean = false;
  redirect: boolean = true;
  isEdit: boolean = false;
  brandStore: IBrandModule;
  frontendStore: IFrontendModule;
  processStore: IProcessModule;

  brand: IBrand = {
    brand_id: undefined,
    brand_name: ""
  };

  constructor() {
    super();
    this.brandStore = brandStore;
    this.frontendStore = frontendStore;
    this.processStore = processStore;
  }

  addBrand() {
    this.brandStore.addBrand({ ...this.brand, redirect: this.redirect });
  }

  updateBrand() {
    this.isEdit = false;
    this.brandStore.updateBrand(this.brand);
  }

  setBrand(item: IBrand) {
    this.isEdit = true;
    this.brand = JSON.parse(JSON.stringify(item));
  }

  setCancel() {
    this.isEdit = false;
    this.brand = { brand_name: "", brand_id: undefined };
    // @ts-ignore
    this.$refs.manageForm.reset();
  }

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      if (this.isEdit) {
        this.updateBrand();
      } else {
        this.addBrand();
      }
    }
  }

  showDelete(item: IBrand) {
    this.brand = item;
    this.frontendStore.setDeleteModal({
      show: true,
      name: this.brand.brand_name,
      title: "Brand"
    });

    this.processStore.setCurrentToDelete({
      deleteFunction: this.brandStore.deleteBrand,
      id: this.brand.brand_id,
      others: { redirect: this.redirect }
    });
  }

  searchBrand(search: string) {
    this.brandStore.fetchBrands({ search })
  }


  clearFields() {
    this.brand.brand_id = undefined;
    this.brand.brand_name = ""
  }

  closeModal() {
    this.frontendStore.setBrandModal(false);
  }


  get brandList() {
    return this.brandStore.getBrands;
  }

  get brandTitle() {
    return this.isEdit ? "Edit Brand" : "Add Brand";
  }

  get loading() {
    if (this.brandStore.getLoading) {
      this.frontendStore.setBrandModal(false);
    }
    return this.brandStore.getLoading;
  }

  get modalState() {
    return this.frontendStore.brandModalState;
  }

  set modalState(show: boolean) {
    this.frontendStore.setBrandModal(show);
  }

  rules: Object = {
    brand_name: [(v: any) => !!v || "Brand Name is required"]
  };
}

export default BrandMixin;
