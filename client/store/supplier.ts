import { VuexModule, Mutation, Action, Module } from "vuex-module-decorators";
import ISupplierInfo from "~/interfaces/ISupplier";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import { frontendStore } from '~/utils/store-accessor'
import { SET_SUPPLIERS, DELETE_SUPPLIER, UPDATE_SUPPLIER, ADD_SUPPLIER, SET_LOADING } from '~/configs/types';
@Module({
  name: "supplier",
  namespaced: true
})
export default class Supplier extends VuexModule {
  private url: string = "/api/supplier/";
  private suppliers: Array<ISupplierInfo> = [];
  public path: string = "/suppliers";
  private loading: boolean = false;

  get getLoading() {
    return this.loading;
  }

  get getSupplier() {
    return this.suppliers;
  }

  @Mutation
  public [SET_SUPPLIERS](suppliers: Array<ISupplierInfo>) {
    this.suppliers = suppliers;
  }

  @Mutation
  public [DELETE_SUPPLIER](supplier_id: number) {
    this.suppliers = this.suppliers.filter(
      (item: ISupplierInfo) => item.supplier_id != supplier_id
    );
  }

  @Mutation
  public [UPDATE_SUPPLIER](supplier: ISupplierInfo) {
    this.suppliers = this.suppliers.map(item =>
      item.supplier_id === supplier.supplier_id ? supplier : item
    );
  }

  @Mutation
  public [ADD_SUPPLIER](supplier: ISupplierInfo) {
    this.suppliers = [supplier, ...this.suppliers];
  }

  @Mutation
  private [SET_LOADING](state: boolean) {
    this.loading = state;
  }

  @Action({ commit: SET_LOADING })
  setLoading(state: boolean) {
    return state;
  }

  @Action({ commit: SET_SUPPLIERS })
  public async fetchSuppliers() {
    const result = await $axios.$get(this.url);
    return result.data;
  }

  @Action({ commit: ADD_SUPPLIER })
  public async addSupplier({ supplier, redirect }: { supplier: ISupplierInfo; redirect: boolean; }) {

    this.setLoading(true);
    const result = await $axios.$post(this.url, supplier, config);


    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    return { supplier_id: result.data.supplier_id, ...supplier };
  }

  @Action({ commit: UPDATE_SUPPLIER })
  public async updateSupplier(supplier: ISupplierInfo) {
    const result = await $axios.$put(this.url, supplier, config);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    return supplier;
  }

  @Action({ commit: DELETE_SUPPLIER })
  public async deleteSupplier(supplier_id: number) {
    const result = await $axios.$delete(`${this.url}${supplier_id}`);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    return supplier_id;
  }
}
