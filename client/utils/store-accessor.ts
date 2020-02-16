import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import ProductModule from "~/store/product";
import FrontendModule from "~/store/frontend";
import SupplierModule from "~/store/supplier";
import ProcessModule from "~/store/process";

let productStore: ProductModule;
let frontendStore: FrontendModule;
let supplierStore: SupplierModule;
let processStore: ProcessModule;

function initialiseStores(store: Store<any>): void {
  productStore = getModule(ProductModule, store);
  frontendStore = getModule(FrontendModule, store);
  supplierStore = getModule(SupplierModule, store);
  processStore = getModule(ProcessModule, store);
}

export {
  initialiseStores,
  productStore,
  frontendStore,
  supplierStore,
  processStore
};
