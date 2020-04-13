import { ActionTree, MutationTree, Store } from "vuex";
import { initialiseStores, categoryStore } from "~/utils/store-accessor";
import { IRootState } from "~/interfaces";
import VuexPersistence from 'vuex-persist'
import config from "~/configs/axiosConfig";
import { $axios } from "~/utils/axios";
import IResult from "~/interfaces/IResult";

function getPlugins() {
  let plugins = []

  if (process.browser) {
    const vuexLocal = new VuexPersistence<IRootState>({
      storage: window.localStorage
    })

    plugins.push(vuexLocal.plugin)
  }

  const initializer = (store: Store<any>) => initialiseStores(store);
  plugins.push(initializer);

  return plugins;
}

export const plugins = getPlugins();

export const mutation: MutationTree<IRootState> = {};

export const actions: ActionTree<IRootState, IRootState> = {
  async nuxtServerInit({ commit, dispatch }, context) {
    // Fetch Categories
    const category: IResult = await $axios.$get("/api/category", config);

    commit("category/SET_CATEGORIES", category.data);

    // Fetch Brands
    const brand: IResult = await $axios.$get("/api/brand", config);

    commit("brand/SET_BRANDS", brand.data);

    // Fetch Suppliers
    const supplier: IResult = await $axios.$get("/api/supplier");

    commit("supplier/SET_SUPPLIERS", supplier.data);

    //Fetch Roles
    const roles: IResult = await $axios.$get("/api/role");

    commit("role/SET_ROLE", roles.data);
  }
};

export * from "~/utils/store-accessor";
