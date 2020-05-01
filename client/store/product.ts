import { Module, VuexModule, Action, Mutation, MutationAction } from "vuex-module-decorators";
import IProduct from "~/interfaces/IProduct";
import { frontendStore } from '~/utils/store-accessor';
import { ADD_NEW_PRODUCT, SET_CURRENT, SET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SET_SEARCH, SET_COUNT } from '~/configs/types';
import IFilter from '~/interfaces/IFilter';
import ProductAPI from '@/api/Product'

const productAPI = new ProductAPI;

@Module({
  name: "product",
  namespaced: true
})
export default class Product extends VuexModule {
  products: Array<IProduct> = [];
  current: IProduct = null;
  count: number = 0
  path = "/products";

  @Mutation
  public [ADD_NEW_PRODUCT](product: IProduct): void {
    this.products.unshift(product);
  }

  @Mutation
  public [SET_CURRENT](product: IProduct): void {
    this.current = product;
  }

  @Mutation
  public [SET_PRODUCTS](products: Array<IProduct>): void {
    this.products = products;
  }

  @Mutation
  public [SET_COUNT](count: number): void {
    this.count = count;
  }

  @Mutation
  public [ADD_PRODUCT](product: IProduct): void {
    if (!product) return;
    this.products = [product, ...this.products];
  }

  @Mutation
  public [UPDATE_PRODUCT](product: IProduct) {
    this.products = this.products.map(item =>
      item.product_id === product.product_id ? product : item
    );
  }

  @Mutation
  public [DELETE_PRODUCT](product_id: number) {
    this.products = this.products.filter(prod => prod.product_id != product_id);
  }

  //action
  @Action({ commit: ADD_PRODUCT, rawError: true })
  public async addProduct(product: IProduct) {

    const result = await productAPI.addProduct(product);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return { product_id: result.data.product_id, ...product };
  }

  @Action({ commit: SET_CURRENT, rawError: true })
  public async fetchSingleProduct(barcode: string) {
    const result = await productAPI.fetchSingleProduct(barcode);
    return result.data != undefined ? result.data : null;
  }

  @Action({ rawError: true })
  public async fetchProducts(filter: IFilter) {
    const result = await productAPI.fetchProducts(filter);
    if (result.success) {
      this.context.commit(SET_PRODUCTS, result.data)
      this.context.commit(SET_COUNT, result.count)
    };
  }


  @Action({ commit: UPDATE_PRODUCT, rawError: true })
  public async updateProduct(product: IProduct) {
    const formData = new FormData();

    const result = await productAPI.updateProduct(product);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return product;
  }

  @Action({ commit: DELETE_PRODUCT, rawError: true })
  public async deleteProduct(id: IProduct['product_id']) {
    const result = await productAPI.deleteProduct(id);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return id;
  }

}
