import { ActionTree, MutationTree, Store } from "vuex";
import { initialiseStores, categoryStore } from "~/utils/store-accessor";
import { RootState } from "~/interfaces/IRoot";
import config from "~/configs/axiosConfig";
import { $axios } from "~/utils/axios";
import IResult from "~/interfaces/IResult";
import ICategory from "~/interfaces/ICategory";
import IRole from "~/interfaces/IRole";

const initializer = (store: Store<any>) => initialiseStores(store);

export const plugins = [initializer];

export const mutation: MutationTree<RootState> = {};

export const actions: ActionTree<RootState, RootState> = {
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
