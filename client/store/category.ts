import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";

import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";

import ICategory from "~/interfaces/ICategory";
import IResult from "~/interfaces/IResult";
import { frontendStore } from '~/utils/store-accessor';
import { SET_LOADING, SET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '~/configs/types';
import IFilter from '~/interfaces/IFilter';
import filterGenerator from '~/utils/filterGenerator';


@Module({ name: "category", namespaced: true })
export default class Category extends VuexModule {
  private url: string = "/api/category";
  private path: string = "/others";
  private categories: Array<ICategory> = [];
  private loading: boolean = false;

  get getLoading() {
    return this.loading;
  }

  get getCategories() {
    return this.categories;
  }

  @Mutation
  private [SET_CATEGORIES](categories: Array<ICategory>): void {
    this.categories = categories;
  }

  @Mutation
  private [ADD_CATEGORY](category: ICategory) {
    this.categories = [category, ...this.categories];
  }

  @Mutation
  private [UPDATE_CATEGORY](category: ICategory): void {
    this.categories = this.categories.map(item =>
      item.category_id === category.category_id ? category : item
    );
  }

  @Mutation
  private [DELETE_CATEGORY](category_id: number): void {
    this.categories = this.categories.filter(
      item => item.category_id !== category_id
    );
  }

  @Mutation
  private [SET_LOADING](state: boolean) {
    this.loading = state;
  }

  @Action({ commit: SET_LOADING })
  setLoading(state: boolean) {
    return state;
  }

  @Action({ commit: SET_CATEGORIES })
  public async fetchCategories(filter: IFilter) {
    const result: IResult = await $axios.$get(`${this.url}${filterGenerator(filter)}`, config);
    return result.data;
  }

  @Action({ rawError: true })
  public async addCategory({ category, redirect }: { category: ICategory, redirect: boolean }) {

    this.setLoading(true);
    const result: IResult = await $axios.$post(this.url, category, config);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    if (result.success) return this.context.commit(ADD_CATEGORY, { ...category, category_id: result.data.category_id });
  }

  @Action({ commit: UPDATE_CATEGORY })
  public async updateCategory(category: ICategory) {
    const result: IResult = await $axios.$put(this.url, category, config);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    return category;
  }

  @Action({ commit: DELETE_CATEGORY })
  public async deleteCategory(category_id: number) {
    const result: IResult = await $axios.$delete(`${this.url}/${category_id}`);


    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)


  }
}
