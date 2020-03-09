import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";

import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";

import ICategory from "~/interfaces/ICategory";
import IResult from "~/interfaces/IResult";
import { setNotification } from "~/utils/setNotification";

@Module({ name: "category", namespaced: true })
export default class Category extends VuexModule {
  private url: string = "/api/category";
  private path: string = "/product";
  private categories: Array<ICategory> = [];

  get getCategories() {
    return this.categories;
  }

  @Mutation
  private SET_CATEGORIES(categories: Array<ICategory>): void {
    this.categories = categories;
  }

  @Mutation
  private ADD_CATEGORY(category: ICategory) {
    this.categories = [...this.categories, category];
  }

  @Mutation
  private UPDATE_CATEGORY(category: ICategory): void {
    this.categories = this.categories.map(item =>
      item.category_id === category.category_id ? category : item
    );
  }
  @Mutation
  private DELETE_CATEGORY(category_id: number): void {
    this.categories = this.categories.filter(
      item => item.category_id !== category_id
    );
  }

  @Action({ rawError: true })
  public async fetchCategories() {
    const result: IResult = await $axios.$get(this.url, config);

    this.context.commit("SET_CATEGORIES", result.data);
  }

  @Action({ rawError: true })
  public async addCategory(category: ICategory) {
    const result: IResult = await $axios.$post(this.url, category, config);

    this.context.commit("ADD_CATEGORY", { category });
    setNotification(result.message, result.success, this.path);
  }

  @Action({ rawError: true })
  public async updateCategory(category: ICategory) {
    const result: IResult = await $axios.$put(this.url, category, config);

    this.context.commit("UPDATE_CATEGORY", category);
    setNotification(result.message, result.success, this.path);
  }

  @Action({ rawError: true })
  public async deleteCategory(category_id: number) {
    const result: IResult = await $axios.$delete(`${this.url}/${category_id}`);

    this.context.commit("DELETE_CATEGORY", category_id);
    setNotification(result.message, result.success, this.path);
  }
}
