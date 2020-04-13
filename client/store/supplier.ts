import SupplierAPI from '~/api/Supplier'
import { frontendStore } from '~/utils/store-accessor'
import { ISupplier, IFilter } from '~/interfaces';
import { VuexModule, Mutation, Action, Module } from "vuex-module-decorators";
import { SET_SUPPLIERS, DELETE_SUPPLIER, UPDATE_SUPPLIER, ADD_SUPPLIER, SET_LOADING } from '~/configs/types';

const supplierAPI = new SupplierAPI;

@Module({ name: "supplier", namespaced: true })
export default class Supplier extends VuexModule {
  path: string = "/suppliers";
  private suppliers: ISupplier[] = [];
  private loading: boolean = false;

  get getLoading() {
    return this.loading;
  }

  get getSupplier() {
    return this.suppliers;
  }

  @Mutation
  [SET_SUPPLIERS](suppliers: Array<ISupplier>) {
    this.suppliers = suppliers;
  }

  @Mutation
  [DELETE_SUPPLIER](supplier_id: number) {
    this.suppliers = this.suppliers.filter(
      (item: ISupplier) => item.supplier_id != supplier_id
    );
  }

  @Mutation
  [UPDATE_SUPPLIER](supplier: ISupplier) {
    this.suppliers = this.suppliers.map(item =>
      item.supplier_id === supplier.supplier_id ? supplier : item
    );
  }

  @Mutation
  [ADD_SUPPLIER](supplier: ISupplier) {
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
  async fetchSuppliers(filter: IFilter) {
    const result = await supplierAPI.fetchSuppliers(filter);
    if (result.success) return result.data;
  }

  @Action({ commit: ADD_SUPPLIER })
  async addSupplier({ supplier, redirect }: { supplier: ISupplier; redirect: boolean; }) {

    this.setLoading(true);
    const result = await supplierAPI.addSupplier(supplier);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    if (result.success) return { supplier_id: result.data.supplier_id, ...supplier };
  }

  @Action({ commit: UPDATE_SUPPLIER })
  async updateSupplier(supplier: ISupplier) {
    const result = await supplierAPI.updateSupplier(supplier)

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return supplier;
  }

  @Action({ commit: DELETE_SUPPLIER })
  async deleteSupplier(supplier_id: ISupplier['supplier_id']) {
    const result = await supplierAPI.deleteSupplier(supplier_id);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return supplier_id;
  }
}
