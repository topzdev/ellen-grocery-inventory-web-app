import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import IProduct from "~/interfaces/IProduct";
import IResult from "~/interfaces/IResult";
import { frontendStore } from '~/utils/store-accessor';
import { ADD_NEW_PRODUCT, SET_CURRENT, SET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, SET_SEARCH } from '~/configs/types';
import filterGenerator from '~/utils/filterGenerator';
import IFilter from '~/interfaces/IFilter';

@Module({
  name: "product",
  namespaced: true
})
export default class Product extends VuexModule {
  // states
  private products: Array<IProduct> = [];
  private singleProduct: object = {};
  private url: string = "api/product";
  public path = "/products";

  get getProducts() {
    return this.products;
  }

  get getAddonItems() {
    return [];
  }

  get tangina() {
    console.log("Passing the way");
    return this.singleProduct;
  }

  @Mutation
  public [ADD_NEW_PRODUCT](product: IProduct): void {
    this.products.unshift(product);
  }

  @Mutation
  public [SET_CURRENT](product: IProduct): void {
    this.singleProduct = product;
  }

  @Mutation
  public [SET_PRODUCTS](products: Array<IProduct>): void {
    this.products = products;
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

    const formData = new FormData();

    formData.append('product_name', product.product_name.toString())
    formData.append('barcode', product.barcode.toString())
    formData.append('quantity_min', product.quantity_min.toString())
    formData.append('quantity_max', product.quantity_max.toString())
    formData.append('quantity', product.quantity.toString())
    formData.append('price', product.price.toString())
    formData.append('description', product.description)
    formData.append('brand_id', product.brand_id.toString())
    formData.append('supplier_id', product.supplier_id.toString())
    formData.append('category_id', product.category_id.toString())
    formData.append('file', product.imageFile!)

    const result: IResult = await $axios.$post(`${this.url}`, formData, config);


    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return {
      product_id: result.data.product_id,
      ...product
    };

  }

  @Action({ commit: SET_CURRENT, rawError: true })
  public async fetchSingleProduct(barcode: string) {
    console.log(barcode);
    const result: IResult = await $axios.$get(`${this.url}/${barcode}`);

    return result.data != undefined ? result.data : null;
  }

  @Action({ commit: SET_PRODUCTS, rawError: true })
  public async fetchProducts(query: IFilter) {
    const result: IResult = await $axios.$get(`${this.url}${filterGenerator(query)}`, config);
    return result.data;
  }


  @Action({ commit: UPDATE_PRODUCT, rawError: true })
  public async updateProduct(product: IProduct) {
    const formData = new FormData();

    formData.append('product_id', product.product_id!.toString())
    formData.append('product_name', product.product_name.toString())
    formData.append('barcode', product.barcode.toString())
    formData.append('quantity_min', product.quantity_min.toString())
    formData.append('quantity_max', product.quantity_max.toString())
    formData.append('quantity', product.quantity.toString())
    formData.append('price', product.price.toString())
    formData.append('description', product.description)
    formData.append('brand_id', product.brand_id.toString())
    formData.append('supplier_id', product.supplier_id.toString())
    formData.append('category_id', product.category_id.toString())
    formData.append('image', product.image!.toString())
    formData.append('image_url', product.image_url!.toString())
    formData.append('file', product.imageFile!)

    const result: IResult = await $axios.$put(`${this.url}`, formData, config);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    return product;
  }

  @Action({ commit: DELETE_PRODUCT, rawError: true })
  public async deleteProduct({ id, others }: any) {
    console.log('hello', others);
    const result: IResult = await $axios.$delete(
      `${this.url}`,
      { ...config, data: { image: others, product_id: id } }
    );

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    return id;
  }
}
