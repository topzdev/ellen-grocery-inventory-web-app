import SupplierAPI from '~/api/Supplier'
import { frontendStore } from '~/utils/store-accessor'
import { ISupplier, IFilter } from '~/interfaces';
import { VuexModule, Mutation, Action, Module, MutationAction } from "vuex-module-decorators";
import { SET_SUPPLIERS, DELETE_SUPPLIER, UPDATE_SUPPLIER, ADD_SUPPLIER, SET_LOADING, SET_CURRENT } from '~/configs/types';

const supplierAPI = new SupplierAPI;

@Module({ name: "supplier", namespaced: true })
export default class Supplier extends VuexModule {
  path: string = "/suppliers";
  suppliers: ISupplier[] = [];
  supplier: ISupplier | null = null;
  loading: boolean = false;

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

  @Action
  async fetchSingleSupplier(supplier_id: ISupplier['supplier_id']) {
    const result = await supplierAPI.fetchSingleSupplier(supplier_id);
    if (result.success) this.context.commit(SET_CURRENT, result.data);
  }

  @Action
  async addSupplier({ supplier, redirect }: { supplier: ISupplier; redirect: boolean; }) {

    this.setLoading(true);
    const result = await supplierAPI.addSupplier(supplier);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    if (result.success) this.context.commit(ADD_SUPPLIER, { supplier_id: result.data, ...supplier });
  }

  @Action
  async updateSupplier(supplier: ISupplier) {
    const result = await supplierAPI.updateSupplier(supplier)

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) this.context.commit(UPDATE_SUPPLIER, supplier);
  }

  @Action({ commit: DELETE_SUPPLIER })
  async deleteSupplier(supplier_id: ISupplier['supplier_id']) {
    const result = await supplierAPI.deleteSupplier(supplier_id);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) this.context.commit(DELETE_SUPPLIER, supplier_id);
  }
}
