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
import ICustomerModule from "~/store/customer";
import ICashierModule from '~/store/cashier';

let productStore: IProductModule;
let frontendStore: IFrontendModule;
let supplierStore: ISupplierModule;
let processStore: IProcessModule;
let brandStore: IBrandModule;
let categoryStore: ICategoryModule;
let roleStore: IRoleModule;
let accountStore: IAccountModule;
let customerStore: ICustomerModule;
let cashierStore: ICashierModule;

function initialiseStores(store: Store<any>): void {
  productStore = getModule(IProductModule, store);
  frontendStore = getModule(IFrontendModule, store);
  supplierStore = getModule(ISupplierModule, store);
  processStore = getModule(IProcessModule, store);
  brandStore = getModule(IBrandModule, store);
  categoryStore = getModule(ICategoryModule, store);
  roleStore = getModule(IRoleModule, store);
  accountStore = getModule(IAccountModule, store);
  customerStore = getModule(ICustomerModule, store);
  cashierStore = getModule(ICashierModule, store);
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
  customerStore,
  cashierStore,
  IProductModule,
  IFrontendModule,
  ISupplierModule,
  IProcessModule,
  IBrandModule,
  ICategoryModule,
  IRoleModule,
  IAccountModule,
  ICustomerModule,
  ICashierModule
};
