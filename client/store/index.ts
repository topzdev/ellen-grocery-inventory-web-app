import { ActionTree, MutationTree } from "vuex";
import { getPlugins } from '~/utils/plugin-accessor';
import { IRootState } from "~/interfaces";
import CategoryAPI from '~/api/Category';
import BrandAPI from '~/api/Brand';
import SupplierAPI from '~/api/Supplier';
import RoleAPI from '~/api/Role';

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
