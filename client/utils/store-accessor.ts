import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import IProductModule from "~/store/product";
import IFrontendModule from "~/store/frontend";
import ISupplierModule from "~/store/supplier";
import IProcessModule from "~/store/process";

let productStore: IProductModule;
let frontendStore: IFrontendModule;
let supplierStore: ISupplierModule;
let processStore: IProcessModule;

function initialiseStores(store: Store<any>): void {
  productStore = getModule(IProductModule, store);
  frontendStore = getModule(IFrontendModule, store);
  supplierStore = getModule(ISupplierModule, store);
  processStore = getModule(IProcessModule, store);
}

export {
  initialiseStores,
  productStore,
  frontendStore,
  supplierStore,
  processStore,
  IProductModule,
  IFrontendModule,
  ISupplierModule,
  IProcessModule
};
