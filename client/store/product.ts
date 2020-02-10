import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";

@Module({
  name: "product",
  namespaced: true
})
export default class Product extends VuexModule {
  // states
  private products: Array<Object> = [];

  private addonItems: Object = {
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

  //action
  @Action({ rawError: true })
  public async addProduct(product: Object): Promise<void> {
    const result = await $axios.$post("/api/product", product, config);
    // this.context.commit("ADD_NEW_PRODUCT", product);
  }

  @Action({ rawError: true })
  public async fetchProducts(): Promise<void> {
    const result = await $axios.$get("/api/product", config);
    console.log(result);
    this.context.commit("SET_PRODUCTS", result.data);
  }
}
