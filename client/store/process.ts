import {
  VuexModule,
  Action,
  MutationAction,
  Mutation,
  Module
} from "vuex-module-decorators";
import { ICurrentDelete } from "~/interfaces/IProcess";
import IProductInfo from "~/interfaces/IProduct";
import ISupplierInfo from "~/interfaces/ISupplier";

@Module({
  name: "process",
  namespaced: true,
  stateFactory: true
})
export default class Process extends VuexModule {
  private currentDelete: ICurrentDelete = {};
  private currentProduct: IProductInfo | undefined = undefined;
  private currentSupplier: ISupplierInfo | undefined = undefined;

  get toDeleteItem(): ICurrentDelete {
    return this.currentDelete;
  }

  get toManageProduct(): IProductInfo | undefined {
    return this.currentProduct;
  }

  get toManageSupplier(): ISupplierInfo | undefined {
    return this.currentSupplier;
  }

  @Mutation
  private SET_CURRENT_DELETE(toDelete: ICurrentDelete) {
    this.currentDelete = toDelete;
  }

  @Mutation
  private SET_CURRENT_PRODUCT(product: IProductInfo) {
    this.currentProduct = product;
  }

  @Mutation
  private SET_CURRENT_SUPPLIER(supplier: ISupplierInfo) {
    this.currentSupplier = supplier;
  }

  @Action
  setCurrentToDelete(toDelete: ICurrentDelete | undefined) {
    this.context.commit("SET_CURRENT_DELETE", toDelete);
  }

  @Action
  setCurrentProduct(product: IProductInfo | undefined) {
    this.context.commit("SET_CURRENT_PRODUCT", product);
  }

  @Action
  setCurrentSupplier(supplier: ISupplierInfo | undefined) {
    this.context.commit("SET_CURRENT_SUPPLIER", supplier);
  }
}
