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
  redirect: boolean = true;
  valid: boolean = false;
  dialog: boolean = true;
  public isEdit: boolean = false;
  public brandStore: IBrandModule;
  public frontendStore: IFrontendModule;
  public processStore: IProcessModule;

  public brand: IBrand = {
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
    this.brandStore.addBrand({...this.brand, redirect: this.redirect});
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
    this.$refs.manageForm.resetValidation();
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
      id: this.brand.brand_id
    });
  }

  searchBrand(search: string) {
    if (search.length <= 0) this.brandStore.fetchBrands();
    this.brandStore.searchBrands(search);
  }

  get brandList() {
    return this.brandStore.getBrands;
  }

  get brandTitle() {
    return this.isEdit ? "Edit Brand" : "Add Brand";
  }

  rules: Object = {
    brand_name: [(v: any) => !!v || "Brand Name is required"]
  };
}

export default BrandMixin;
