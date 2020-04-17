import { ActionTree, MutationTree, Store } from "vuex";
import { initialiseStores, categoryStore } from "~/utils/store-accessor";
import { IRootState } from "~/interfaces";
import VuexPersistence from 'vuex-persist'
import config from "~/configs/axiosConfig";
import { $axios } from "~/utils/axios";
import IResult from "~/interfaces/IResult";
import CategoryAPI from '~/api/Category';
import BrandAPI from '~/api/Brand';
import SupplierAPI from '~/api/Supplier';
import RoleAPI from '~/api/Role';


function getPlugins() {
  let plugins = []

  if (process.browser) {
    const vuexLocal = new VuexPersistence<IRootState>({
      storage: window.localStorage,
      modules: ['cashier']
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
    commit("category/SET_CATEGORIES", (await new CategoryAPI().fetchCategories({})).data);

    // Fetch Brands
    commit("brand/SET_BRANDS", (await new BrandAPI().fetchBrands({})).data);

    // Fetch Suppliers
    commit("supplier/SET_SUPPLIERS", (await new SupplierAPI().fetchSuppliers({})).data);

    //Fetch Roles
    commit("role/SET_ROLE", (await new RoleAPI().fetchRoles({})).data);
  }
};

export * from "~/utils/store-accessor";
