import { VuexModule, Mutation, Action, Module } from "vuex-module-decorators";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";

import IBrand from "~/interfaces/IBrand";
import IResult from "~/interfaces/IResult";
import { IDeleteConfig } from '~/interfaces/IUniversal';
import { frontendStore } from '~/utils/store-accessor';
import { SET_BRANDS, ADD_BRAND, UPDATE_BRAND, DELETE_BRAND, SET_LOADING, ADD_TRANSACTION } from '~/configs/types';
import IFilter from '~/interfaces/IFilter';
import filterGenerator from '~/utils/filterGenerator';

/**
 * ? TASK: retun the id of the added product, updated product ...
 */
@Module({ name: "brand", namespaced: true })
export default class Brand extends VuexModule {
  private url: string = "/api/brand";
  private path: string = "/others";
  private brands: Array<IBrand> = [];

  private loading: boolean = false;

  get getLoading() {
    return this.loading;
  }


  get getBrands() {
    return this.brands;
  }

  @Mutation
  private [SET_BRANDS](brands: Array<IBrand>): void {
    this.brands = brands;
  }
  @Mutation
  private [ADD_BRAND](brand: IBrand): void {
    this.brands = [brand, ...this.brands];
  }
  @Mutation
  private [UPDATE_BRAND](brand: IBrand): void {
    this.brands = this.brands.map(item =>
      item.brand_id === brand.brand_id ? brand : item
    );
  }
  @Mutation
  private [DELETE_BRAND](brand_id: number): void {
    this.brands = this.brands.filter(item => item.brand_id !== brand_id);
  }

  @Mutation
  private [SET_LOADING](state: boolean) {
    this.loading = state;
  }

  @Action({ commit: SET_LOADING })
  setLoading(state: boolean) {
    return state;
  }

  @Action({ commit: SET_BRANDS, rawError: true })
  public async fetchBrands(filter: IFilter) {
    const result: IResult = await $axios.$get(`${this.url}${filterGenerator(filter)}`, config);
    return result.data;
  }

  @Action({ rawError: true })
  public async addBrand({ brand_name, redirect }: any) {

    console.log('Processed Mehh')
    this.setLoading(true);
    const result: IResult = await $axios.$post(
      this.url,
      { brand_name },
      config
    );

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    if (result.success) return this.context.commit(ADD_BRAND, { brand_name, brand_id: result.data.brand_id });

  }

  @Action({ commit: UPDATE_BRAND, rawError: true })
  public async updateBrand({ brand_name, brand_id }: IBrand) {
    const result: IResult = await $axios.$put(
      this.url,
      { brand_name, brand_id },
      config
    );

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)
    return { brand_name, brand_id };
  }

  @Action({ commit: DELETE_BRAND, rawError: true })
  public async deleteBrand({ id, redirect }: IDeleteConfig) {
    const result: IResult = await $axios.$delete(`${this.url}/${id}`);


    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect);
    return id;
  }
}
