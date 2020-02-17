import { VuexModule, Action, Mutation, Module } from "vuex-module-decorators";
import { ICurrentDelete } from "@/interfaces/ProcessInterface";
import IProduct from "@/interfaces/productInfoInterface";

@Module({
  name: "process",
  namespaced: true,
  stateFactory: true
})
export default class Process extends VuexModule {
  private currentDelete: ICurrentDelete = {};
  private currentProduct: IProduct | undefined = undefined;

  get toDeleteItem(): ICurrentDelete {
    return this.currentDelete;
  }

  get toManageProduct(): IProduct | undefined {
    return this.currentProduct;
  }

  @Mutation
  private SET_CURRENT_DELETE(toDelete: ICurrentDelete) {
    this.currentDelete = toDelete;
  }

  @Mutation
  private SET_CURRENT_PRODUCT(product: IProduct) {
    this.currentProduct = product;
  }

  @Action
  setCurrentToDelete(toDelete: ICurrentDelete | undefined) {
    this.context.commit("SET_CURRENT_DELETE", toDelete);
  }

  @Action
  setCurrentProduct(product: IProduct | undefined) {
    this.context.commit("SET_CURRENT_PRODUCT", product);
  }
}
