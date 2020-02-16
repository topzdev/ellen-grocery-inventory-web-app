import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import { frontendStore } from "@/store";
@Module({
  name: "product",
  namespaced: true
})
export default class Product extends VuexModule {
  // states
  private products: Array<Object> = [];

  public addonItems: Object = {
    brand: ["nestle", "rebisco", "febisco", "palmovile", "M.Y San"],
    supplier: ["Beth Corp", "Nestle Corp"],
    category: ["Biscuit", "Dishwasing", "Crackers", "Etc."]
  };

  //getters
  get getProduct() {
    return this.products;
  }

  get getAddonItems() {
    return this.addonItems;
  }

  @Mutation
  public ADD_NEW_PRODUCT(product: Object): void {
    this.products.unshift(product);
  }

  @Mutation
  public SET_PRODUCTS(products: Array<Object>): void {
    this.products = products;
  }

  @Mutation
  public DELETE_PRODUCT(barcode: string) {
    this.products = this.products.filter(prod => prod.barcode != barcode);
  }

  //action
  @Action({ rawError: true })
  public async addProduct(product: Object): Promise<void> {
    try {
      const result = await $axios.$post("/api/product", product, config);
      frontendStore.setSnackbar({
        message: result.message,
        success: result.success,
        show: true
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
  public async deleteProduct(barcode: string): Promise<void> {
    try {
      const result = await $axios.$delete(`/api/product/${barcode}`, config);

      this.context.commit("DELETE_PRODUCT", barcode);

      frontendStore.setSnackbar({
        message: result.message,
        success: result.success,
        show: true
      });
    } catch (error) {
      console.error(error.stack);
    }
  }
}
