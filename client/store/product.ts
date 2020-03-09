import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import IProduct from "~/interfaces/IProductInfo";
import { setNotification } from "~/utils/setNotification";

@Module({
  name: "product",
  namespaced: true
})
export default class Product extends VuexModule {
  // states
  private products: Array<IProduct> = [];
  private search: Array<IProduct> = [];
  private singleProduct: object = {};
  public path = "/products";

  get getProducts() {
    return this.products;
  }

  get getAddonItems() {
    return [];
  }

  get getSearchProducts() {
    return this.search;
  }

  get tangina() {
    console.log("Passing the way");
    return this.singleProduct;
  }

  @Mutation
  public ADD_NEW_PRODUCT(product: IProduct): void {
    this.products.unshift(product);
  }

  @Mutation
  public LOW(product: IProduct): void {
    this.singleProduct = product;
  }

  @Mutation
  public SET_PRODUCTS(products: Array<IProduct>): void {
    this.products = products;
  }

  @Mutation
  public DELETE_PRODUCT(product_id: number) {
    this.products = this.products.filter(prod => prod.product_id != product_id);
  }

  @Mutation
  public SET_SEARCH(searched: Array<IProduct>): void {
    this.search = searched;
  }

  //action

  @Action({ rawError: true })
  public async addProduct(product: IProduct): Promise<void> {
    try {
      console.log(product)
      const result = await $axios.$post("/api/product", product, config);

      setNotification(result.message, result.success, this.path);
    } catch (error) {
      console.error(error.stack);
    }
  }

  @Action({ rawError: true })
  public async fetchSingleProduct(barcode: string): Promise<void> {
    try {
      console.log(barcode);
      const result = await $axios.$get(`/api/product/${barcode}`);

      this.context.commit("LOW", result.data != undefined ? result.data : null);
    } catch (error) {
      console.error(error.stack);
    }
  }

  @Action({ rawError: true })
  public async fetchProducts(): Promise<void> {
    try {
      const result = await $axios.$get("/api/product", config);
      console.log(result);
      this.context.commit("SET_PRODUCTS", result.data);
    } catch (error) {
      console.error(error.stack);
    }
  }

  @Action({ rawError: true })
  public async updateProduct(product: IProduct): Promise<void> {
    try {
      const result = await $axios.$put("/api/product", product, config);

      setNotification(result.message, result.success, this.path);
    } catch (error) {
      console.error(error.stack);
    }
  }

  @Action({ rawError: true })
  public async deleteProduct(product_id: number): Promise<void> {
    try {
      const result = await $axios.$delete(`/api/product/${product_id}`, config);

      this.context.commit("DELETE_PRODUCT", product_id);

      setNotification(result.message, result.success, this.path);
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
