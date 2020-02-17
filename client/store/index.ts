import { Store } from "vuex";
import { initialiseStores } from "~/utils/store-accessor";
import { Module, VuexModule, Action } from "vuex-module-decorators";
const initializer = (store: Store<any>) => initialiseStores(store);

export const plugins = [initializer];

export * from "~/utils/store-accessor";
