import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import { frontendStore } from "@/store";
import IProduct from "@/interfaces/productInfoInterface";
@Module({
  name: "product",
  namespaced: true
})
export default class Product extends VuexModule {
  // states
  private products: Array<IProduct> = [];
  private search: Array<IProduct> = [];
  public addonItems: Object = {
    brand: ["Nestle", "Rebisco", "Febisco", "Palmovile", "M.Y San"],
    supplier: ["Beth Corp", "Nestle Corp"],
    category: ["Biscuit", "Dishwasing", "Crackers", "Etc."]
  };

  get getProducts() {
    return this.products;
  }

  get getAddonItems() {
    return this.addonItems;
  }

  get getSearchProducts() {
    return this.search;
  }

  @Mutation
  public ADD_NEW_PRODUCT(product: IProduct): void {
    this.products.unshift(product);
  }

  @Mutation
  public SET_PRODUCTS(products: Array<IProduct>): void {
    this.products = products;
  }

  @Mutation
  public DELETE_PRODUCT(barcode: string) {
    this.products = this.products.filter(prod => prod.barcode != barcode);
  }

  @Mutation
  public SET_SEARCH(searched: Array<IProduct>): void {
    this.search = searched;
  }

  //action

  @Action({ rawError: true })
  public async addProduct(product: Object): Promise<void> {
    try {
      const result = await $axios.$post("/api/product", product, config);
      frontendStore.setSnackbar({
        message: result.message,
        success: result.success,
        show: true,
        redirect: "/products"
      });
      console.log(result);
    } catch (error) {
      console.error(error.stack);
    }
  }

  @Action({ rawError: true })
  public async fetchProducts(): Promise<void> {
    const result = await $axios.$get("/api/product", config);
    console.log(result);
    this.context.commit("SET_PRODUCTS", result.data);
  }

  @Action({ rawError: true })
  public async updateProduct(product: IProduct): Promise<void> {
    try {
      const result = await $axios.$put("/api/product", product, config);

      console.log(result);
      frontendStore.setSnackbar({
        message: result.message,
        success: result.success,
        show: true,
        redirect: "/products"
      });
    } catch (error) {
      console.error(error.stack);
    }
  }

  @Action({ rawError: true })
  public async deleteProduct(barcode: string): Promise<void> {
    try {
      const result = await $axios.$delete(`/api/product/${barcode}`, config);

      this.context.commit("DELETE_PRODUCT", barcode);

      frontendStore.setSnackbar({
        message: result.message,
        success: result.success,
        show: true,
        redirect: "/products"
      });
    } catch (error) {
      console.error(error.stack);
    }
  }

  @Action({ rawError: true })
  public async searchProduct(searchString: string): Promise<void> {
    try {
      const result = await $axios.$post(
        `/api/product/search/`,
        { searchString },
        config
      );
      console.log(result);
      this.context.commit("SET_SEARCH", result.data);
    } catch (error) {
      console.error(error.stack);
    }
  }
}
