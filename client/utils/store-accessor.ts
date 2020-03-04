import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import IProductModule from "~/store/product";
import IFrontendModule from "~/store/frontend";
import ISupplierModule from "~/store/supplier";
import IProcessModule from "~/store/process";
import IBrandModule from "~/store/brand";
import ICategoryModule from "~/store/category";

let productStore: IProductModule;
let frontendStore: IFrontendModule;
let supplierStore: ISupplierModule;
let processStore: IProcessModule;
let brandStore: IBrandModule;
let categoryStore: ICategoryModule;

function initialiseStores(store: Store<any>): void {
  productStore = getModule(IProductModule, store);
  frontendStore = getModule(IFrontendModule, store);
  supplierStore = getModule(ISupplierModule, store);
  processStore = getModule(IProcessModule, store);
  brandStore = getModule(IBrandModule, store);
  categoryStore = getModule(ICategoryModule, store);
}

export {
  initialiseStores,
  productStore,
  frontendStore,
  supplierStore,
  processStore,
  brandStore,
  categoryStore,
  IProductModule,
  IFrontendModule,
  ISupplierModule,
  IProcessModule,
  IBrandModule,
  ICategoryModule
};
