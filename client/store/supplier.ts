import { VuexModule, Mutation, Action, Module } from "vuex-module-decorators";
import { supplierStore } from "~/utils/store-accessor";

@Module({
  name: "supplier",
  namespaced: true
})
export default class Supplier extends VuexModule {
  private suppliers: Array<Object | undefined> = [
    {
      supplier_name: "Christopher",
      address: "A 48 Cp Garcia St Tondo,Manila",
      email: "christianlugod05@gmail.com",
      contact: "09286665903"
    }
  ];

  get supplierData() {
    return this.suppliers;
  }
}
