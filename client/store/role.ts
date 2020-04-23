import RoleAPI from '~/api/Role';
import { IFilter, IRole } from '~/interfaces';
import { frontendStore } from '@/utils/store-accessor'
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { SET_ROLE, ADD_ROLE, UPDATE_ROLE, DELETE_ROLE, SET_LOADING } from '~/configs/types';

const roleApi = new RoleAPI;

@Module({ name: "role", namespaced: true })
export default class Role extends VuexModule {
  path: string = "/accounts";
  roles: IRole[] = [];
  loading: boolean = false;

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
  async fetchRoles(filter: IFilter) {
    const result = await roleApi.fetchRoles(filter);

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return result.data;

  }

  @Action({ commit: ADD_ROLE })
  async addRole({ role, redirect }: { role: IRole, redirect: boolean }) {

    this.setLoading(true);

    const result = await roleApi.addRole(role);
    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(redirect ? this.path : undefined)
    this.setLoading(false);

    if (result.success) return { ...role, role_id: result.data.role_id };
  }

  @Action({ commit: UPDATE_ROLE })
  async updateRole(role: IRole) {

    const result = await roleApi.updateRole(role);
    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return role;

  }

  @Action({ commit: DELETE_ROLE })
  async deleteRole(role_id: IRole['role_id']) {

    const result = await roleApi.deleteRole(role_id)

    frontendStore.setSnackbar({ message: result.message, success: result.success, show: true });
    frontendStore.setRedirect(this.path)

    if (result.success) return role_id;
  }
}
