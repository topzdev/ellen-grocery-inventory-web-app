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
import { SET_CURRENT_DELETE, SET_CURRENT_PRODUCT, SET_CURRENT_SUPPLIER } from '~/configs/types';

@Module({
  name: "process",
  namespaced: true,
  stateFactory: true
})
export default class Process extends VuexModule {
  private currentDelete: ICurrentDelete = {};
  private currentProduct: IProductInfo | null = null;
  private currentSupplier: ISupplierInfo | null = null;

  get toDeleteItem() {
    return this.currentDelete;
  }

  get toManageProduct() {
    return this.currentProduct;
  }

  get toManageSupplier() {
    return this.currentSupplier;
  }

  @Mutation
  private [SET_CURRENT_DELETE](toDelete: ICurrentDelete) {
    this.currentDelete = toDelete;
  }

  @Mutation
  private [SET_CURRENT_PRODUCT](product: IProductInfo) {
    this.currentProduct = product;
  }

  @Mutation
  private [SET_CURRENT_SUPPLIER](supplier: ISupplierInfo) {
    this.currentSupplier = supplier;
  }

  @Action({ commit: SET_CURRENT_DELETE })
  setCurrentToDelete(toDelete: ICurrentDelete | undefined) {
    return toDelete;
  }

  @Action({ commit: SET_CURRENT_PRODUCT })
  setCurrentProduct(product: IProductInfo | undefined) {
    return product;
  }

  @Action({ commit: SET_CURRENT_SUPPLIER })
  setCurrentSupplier(supplier: ISupplierInfo | undefined) {
    return supplier;
  }
}
