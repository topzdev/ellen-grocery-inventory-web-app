import CategoryAPI from '@/api/Category'
import { frontendStore } from '~/utils/store-accessor';
import { ICategory, IFilter } from '~/interfaces';
import { Module, Mutation, Action, VuexModule } from "vuex-module-decorators";
import { SET_LOADING, SET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '~/configs/types';

const categoryAPI = new CategoryAPI;

@Module({ name: "category", namespaced: true })
export default class Category extends VuexModule {
  path: string = "/others";
  categories: Array<ICategory> = [];
  loading: boolean = false;

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
  async fetchCategories(filter: IFilter) {
    const result = await categoryAPI.fetchCategories(filter);
    return result.data;
  }

  @Action({ rawError: true })
  async addCategory({ category, redirect }: { category: ICategory, redirect: boolean }) {

    this.setLoading(true);
    const result = await categoryAPI.addCategory(category);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    if (result.success) return this.context.commit(ADD_CATEGORY, { ...category, category_id: result.data.category_id });
  }

  @Action({ commit: UPDATE_CATEGORY })
  async updateCategory(category: ICategory) {
    const result = await categoryAPI.updateCategory(category);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    return category;
  }

  @Action({ commit: DELETE_CATEGORY })
  async deleteCategory(category_id: number) {
    const result = await categoryAPI.deleteCategory(category_id)

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    return category_id
  }
}
