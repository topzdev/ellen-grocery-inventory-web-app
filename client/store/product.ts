import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import IProduct from "~/interfaces/IProduct";
import { setNotification } from "~/utils/setNotification";
import IResult from "~/interfaces/IResult";

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
  public SET_CURRENT(product: IProduct): void {
    this.singleProduct = product;
  }

  @Mutation
  public SET_PRODUCTS(products: Array<IProduct>): void {
    this.products = products;
  }

  @Mutation
  public ADD_PRODUCT(product: IProduct): void {
    this.products = [product, ...this.products];
  }

  @Mutation
  private UPDATE_PRODUCT(product: IProduct) {
    this.products = this.products.map(item =>
      item.product_id === product.product_id ? product : item
    );
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

  @Action({ commit: "ADD_PRODUCT" })
  public async addProduct(product: IProduct) {
    console.log(product);
    const result: IResult = await $axios.$post("/api/product", product, config);

    setNotification(result.message, result.success, this.path);
    return {
      product_id: result.data.product_id,
      ...product
    };
  }

  @Action({ commit: "SET_CURRENT" })
  public async fetchSingleProduct(barcode: string) {
    console.log(barcode);
    const result: IResult = await $axios.$get(`/api/product/${barcode}`);

    return result.data != undefined ? result.data : null;
  }

  @Action({ commit: "SET_PRODUCTS" })
  public async fetchProducts() {
    const result: IResult = await $axios.$get("/api/product", config);
    return result.data;
  }

  @Action({ commit: "UPDATE_PRODUCT" })
  public async updateProduct(product: IProduct) {
    const result: IResult = await $axios.$put("/api/product", product, config);
    setNotification(result.message, result.success, this.path);
    return product;
  }

  @Action({ commit: "DELETE_PRODUCT" })
  public async deleteProduct(product_id: number) {
    const result: IResult = await $axios.$delete(
      `/api/product/${product_id}`,
      config
    );
    setNotification(result.message, result.success, this.path);
    return product_id;
  }

  @Action({ commit: "SET_SEARCH" })
  public async searchProduct(searchString: string) {
    const result: IResult = await $axios.$post(
      `/api/product/search/`,
      { searchString },
      config
    );

    return result.data;
  }
}
