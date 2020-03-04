import { VuexModule, Mutation, Action, Module } from "vuex-module-decorators";
import ISupplierInfo from "~/interfaces/ISupplier";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import { setNotification } from "~/utils/setNotification";

@Module({
  name: "supplier",
  namespaced: true
})
export default class Supplier extends VuexModule {
  private url: string = "/api/supplier/";
  private suppliers: Array<ISupplierInfo> = [];
  public path: string = "/suppliers";

  get getSupplier() {
    return this.suppliers;
  }

  @Mutation
  public SET_SUPPLIERS(suppliers: Array<ISupplierInfo>) {
    this.suppliers = suppliers;
  }

  @Mutation
  public DELETE_SUPPLIER(id: number) {
    this.suppliers = this.suppliers.filter(
      (item: ISupplierInfo) => item.id != id
    );
  }

  @Mutation
  public ADD_SUPPLIER(supplier: ISupplierInfo) {
    this.suppliers = [...this.suppliers, supplier];
  }

  @Action({ rawError: true })
  public async fetchSuppliers() {
    const result = await $axios.$get(this.url);

    this.context.commit("SET_SUPPLIERS", result.data);
  }

  @Action({ rawError: true })
  public async addSupplier(supplier: ISupplierInfo): Promise<void> {
    const result = await $axios.$post(this.url, supplier, config);

    this.context.commit("ADD_SUPPLIER", supplier);

    setNotification(result.message, result.success, this.path);
  }

  @Action({ rawError: true })
  public async updateSupplier(supplier: ISupplierInfo): Promise<void> {
    console.log(supplier);
    const result = await $axios.$put(this.url, supplier, config);
    console.log(result);
    setNotification(result.message, result.success, this.path);
  }

  @Action({ rawError: true })
  public async deleteSupplier(id: number): Promise<void> {
    const result = await $axios.$delete(`${this.url}${id}`);

    this.context.commit("DELETE_SUPPLIER", id);

    setNotification(result.message, result.success, this.path);
  }
}
