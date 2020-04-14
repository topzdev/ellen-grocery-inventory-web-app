import SupplierAPI from '~/api/Supplier'
import { frontendStore } from '~/utils/store-accessor'
import { ISupplier, IFilter } from '~/interfaces';
import { VuexModule, Mutation, Action, Module, MutationAction } from "vuex-module-decorators";
import { SET_SUPPLIERS, DELETE_SUPPLIER, UPDATE_SUPPLIER, ADD_SUPPLIER, SET_LOADING, SET_CURRENT } from '~/configs/types';

const supplierAPI = new SupplierAPI;

@Module({ name: "supplier", namespaced: true })
export default class Supplier extends VuexModule {
  path: string = "/suppliers";
  private suppliers: ISupplier[] = [];
  private supplier: ISupplier | null = null;
  private loading: boolean = false;

  get getLoading() {
    return this.loading;
  }

  get getSuppliers() {
    return this.suppliers;
  }

  get getCurrent() {
    return this.supplier;
  }

  @Mutation
  private [SET_SUPPLIERS](suppliers: Array<ISupplier>) {
    this.suppliers = suppliers;
  }

  @Mutation
  private [DELETE_SUPPLIER](supplier_id: number) {
    this.suppliers = this.suppliers.filter(
      (item: ISupplier) => item.supplier_id != supplier_id
    );
  }

  @Mutation
  private [UPDATE_SUPPLIER](supplier: ISupplier) {
    this.suppliers = this.suppliers.map(item =>
      item.supplier_id === supplier.supplier_id ? supplier : item
    );
  }

  @Mutation
  private [ADD_SUPPLIER](supplier: ISupplier) {
    this.suppliers = [supplier, ...this.suppliers];
  }

  @Mutation
  private [SET_LOADING](state: boolean) {
    this.loading = state;
  }

  @Mutation
  private [SET_CURRENT](supplier: ISupplier) {
    this.supplier = supplier
  }

  @Action({ commit: SET_LOADING })
  setLoading(state: boolean) {
    return state;
  }

  @Action({ commit: SET_SUPPLIERS })
  async fetchSuppliers(filter: IFilter) {
    const result = await supplierAPI.fetchSuppliers(filter);
    return result.data;
  }

  @Action({ commit: SET_CURRENT })
  async fetchSingleSupplier(supplier_id: ISupplier['supplier_id']) {
    const result = await supplierAPI.fetchSingleSupplier(supplier_id);
    return result.data;
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
