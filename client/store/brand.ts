import { VuexModule, Mutation, Action, Module } from "vuex-module-decorators";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";

import IBrand from "~/interfaces/IBrand";
import IResult from "~/interfaces/IResult";
import { setNotification } from "~/utils/setNotification";

/**
 * ? TASK: retun the id of the added product, updated product ...
 */
@Module({ name: "brand", namespaced: true })
export default class Brand extends VuexModule {
  private url: string = "/api/brand";
  private path: string = "/products";
  private brands: Array<IBrand> = [];

  get getBrands() {
    return this.brands;
  }

  @Mutation
  private SET_BRANDS(brands: Array<IBrand>): void {
    this.brands = brands;
  }
  @Mutation
  private ADD_BRAND(brand: IBrand): void {
    this.brands = [brand, ...this.brands];
  }
  @Mutation
  private UPDATE_BRAND(brand: IBrand): void {
    this.brands = this.brands.map(item =>
      item.brand_id === brand.brand_id ? brand : item
    );
  }
  @Mutation
  private DELETE_BRAND(brand_id: number): void {
    this.brands = this.brands.filter(item => item.brand_id !== brand_id);
  }

  @Action({ rawError: true })
  public async fetchBrands() {
    const result: IResult = await $axios.$get(this.url, config);

    this.context.commit("SET_BRANDS", result.data);
  }

  @Action({ rawError: true })
  public async searchBrands(search: string) {
    const result: IResult = await $axios.$get(`${this.url}/search/${search}`);

    this.context.commit("SET_BRANDS", result.data);
  }

  @Action({ rawError: true })
  public async addBrand({ brand_name }: IBrand) {
    const result: IResult = await $axios.$post(
      this.url,
      { brand_name },
      config
    );
    console.log(result);
    this.context.commit("ADD_BRAND", {
      brand_id: result.data.brand_id,
      brand_name
    });
    setNotification(result.message, result.success, this.path);
  }

  @Action({ rawError: true })
  public async updateBrand({ brand_name, brand_id }: IBrand) {
    const result: IResult = await $axios.$put(
      this.url,
      { brand_name, brand_id },
      config
    );

    this.context.commit("UPDATE_BRAND", { brand_name, brand_id });
    setNotification(result.message, result.success, this.path);
  }

  @Action({ rawError: true })
  public async deleteBrand(brand_id: number) {
    const result: IResult = await $axios.$delete(`${this.url}/${brand_id}`);

    this.context.commit("DELETE_BRAND", brand_id);
    setNotification(result.message, result.success, this.path);
  }
}
