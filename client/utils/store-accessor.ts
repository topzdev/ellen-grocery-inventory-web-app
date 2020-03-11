import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import IProductModule from "~/store/product";
import IFrontendModule from "~/store/frontend";
import ISupplierModule from "~/store/supplier";
import IProcessModule from "~/store/process";
import IBrandModule from "~/store/brand";
import ICategoryModule from "~/store/category";
import IRoleModule from "~/store/role";
import IAccountModule from "~/store/account";

let productStore: IProductModule;
let frontendStore: IFrontendModule;
let supplierStore: ISupplierModule;
let processStore: IProcessModule;
let brandStore: IBrandModule;
let categoryStore: ICategoryModule;
let roleStore: IRoleModule;
let accountStore: IAccountModule;

function initialiseStores(store: Store<any>): void {
  productStore = getModule(IProductModule, store);
  frontendStore = getModule(IFrontendModule, store);
  supplierStore = getModule(ISupplierModule, store);
  processStore = getModule(IProcessModule, store);
  brandStore = getModule(IBrandModule, store);
  categoryStore = getModule(ICategoryModule, store);
  roleStore = getModule(IRoleModule, store);
  accountStore = getModule(IAccountModule, store);
}

export {
  initialiseStores,
  productStore,
  frontendStore,
  supplierStore,
  processStore,
  brandStore,
  categoryStore,
  roleStore,
  accountStore,
  IProductModule,
  IFrontendModule,
  ISupplierModule,
  IProcessModule,
  IBrandModule,
  ICategoryModule,
  IRoleModule,
  IAccountModule
};
