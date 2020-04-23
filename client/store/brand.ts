import BrandAPI from '~/api/Brand'
import { frontendStore } from "~/utils/store-accessor";
import { VuexModule, Mutation, Action, Module } from "vuex-module-decorators";
import { SET_BRANDS, ADD_BRAND, UPDATE_BRAND, DELETE_BRAND, SET_LOADING, } from "~/configs/types";
import { IBrand, IFilter, IDeleteConfig } from "~/interfaces";

const brandAPI = new BrandAPI;

@Module({ name: "brand", namespaced: true })
export default class Brand extends VuexModule {
  url: string = "/api/brand";
  path: string = "/others";
  brands: Array<IBrand> = [];
  loading: boolean = false;

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
    const result = await brandAPI.fetchBrands(filter);

    if (result.success) return result.data;
  }

  @Action({ rawError: true })
  public async addBrand({ brand_name, redirect }: any) {

    this.setLoading(true);
    const result = await brandAPI.addBrand(brand_name)

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)

    this.setLoading(false);

    if (result.success) return this.context.commit(ADD_BRAND, { brand_name, brand_id: result.data.brand_id });

  }

  @Action({ commit: UPDATE_BRAND, rawError: true })
  public async updateBrand(brand: IBrand) {
    const result = await brandAPI.updateBrand(brand)

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return brand;
  }

  @Action({ commit: DELETE_BRAND, rawError: true })
  public async deleteBrand({ id, redirect }: IDeleteConfig) {
    const result = await brandAPI.deleteBrand(id);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect);

    if (result.success) return id;
  }
}
