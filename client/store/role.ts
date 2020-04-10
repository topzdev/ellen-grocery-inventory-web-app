import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import IRole from "~/interfaces/IRole";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import IResult from "~/interfaces/IResult";
import { frontendStore } from '@/utils/store-accessor'
import { SET_ROLE, ADD_ROLE, UPDATE_ROLE, DELETE_ROLE, SET_LOADING } from '~/configs/types';

@Module({
  name: "role",
  namespaced: true
})
export default class Role extends VuexModule {
  private url: string = "/api/role";
  private path: string = "/accounts";
  private roles: Array<IRole> = [];
  private loading: boolean = false;

  get getLoading() {
    return this.loading;
  }

  get getRoles(): Array<IRole> {
    return this.roles;
  }

  @Mutation
  private [SET_ROLE](roles: Array<IRole>) {
    this.roles = roles;
  }

  @Mutation
  private [ADD_ROLE](role: IRole) {
    this.roles = [role, ...this.roles];
  }

  @Mutation
  private [UPDATE_ROLE](role: IRole) {
    this.roles = this.roles.map(item =>
      item.role_id === role.role_id ? role : item
    );
  }

  @Mutation
  private [DELETE_ROLE](role_id: number) {
    this.roles = this.roles.filter(item => item.role_id !== role_id);
  }

  @Mutation
  private [SET_LOADING](state: boolean) {
    this.loading = state;
  }

  @Action({ commit: SET_LOADING })
  setLoading(state: boolean) {
    return state;
  }

  @Action({ commit: SET_ROLE })
  public async searchRoles(search: string) {

    const result: IResult = await $axios.$get(`${this.url}/search`);
    return result.data;

  }

  @Action({ commit: SET_ROLE })
  public async fetchRoles() {

    const result: IResult = await $axios.$post(`${this.url}`);
    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)
    return result.data;

  }

  @Action({ commit: ADD_ROLE })
  public async addRole({ role, redirect }: { role: IRole, redirect: boolean }) {

    this.setLoading(true);
    const result: IResult = await $axios.$post(`${this.url}`, role, config);
    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    return {
      role_id: result.data.role_id,
      ...role
    };

  }

  @Action({ commit: UPDATE_ROLE })
  public async updateRole(role: IRole) {

    const result: IResult = await $axios.$put(`${this.url}`, role, config);
    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)
    return role;

  }

  @Action({ commit: DELETE_ROLE })
  public async deleteRole(role_id: number) {

    const result: IResult = await $axios.$delete(`${this.url}/${role_id}`);
    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)
    return role_id;

  }
}