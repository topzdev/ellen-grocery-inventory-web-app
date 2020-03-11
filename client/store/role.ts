import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import IRole from "~/interfaces/IRole";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
import { setNotification } from "~/utils/setNotification";
import IResult from "~/interfaces/IResult";

@Module({
  name: "role",
  namespaced: true
})
export default class Role extends VuexModule {
  private url: string = "/api/role";
  private path: string = "/accounts";
  private roles: Array<IRole> = [];

  get getRoles(): Array<IRole> {
    return this.roles;
  }

  @Mutation
  private SET_ROLES(roles: Array<IRole>) {
    this.roles = roles;
  }

  @Mutation
  private ADD_ROLE(role: IRole) {
    this.roles = [role, ...this.roles];
  }

  @Mutation
  private UPDATE_ROLE(role: IRole) {
    this.roles = this.roles.map(item =>
      item.role_id === role.role_id ? role : item
    );
  }

  @Mutation
  private DELETE_ROLE(role_id: number) {
    this.roles = this.roles.filter(item => item.role_id !== role_id);
  }

  @Action({ rawError: true })
  public async searchRoles(search: string) {
    try {
      const result: IResult = await $axios.$get(`${this.url}/search`);
      return this.context.commit("SET_ROLE", result.data);
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ rawError: true })
  public async fetchRoles() {
    try {
      const result: IResult = await $axios.$post(`${this.url}`);
      this.context.commit("SET_ROLE", result.data);

      return setNotification(result.message, result.success, this.path);
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ rawError: true })
  public async addRole(role: IRole) {
    try {
      const result: IResult = await $axios.$post(`${this.url}`, role, config);

      this.context.commit("ADD_ROLE", {
        role_id: result.data.role_id,
        ...role
      });

      return setNotification(result.message, result.success, this.path);
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ rawError: true })
  public async updateRole(role: IRole) {
    try {
      const result: IResult = await $axios.$put(`${this.url}`, role, config);

      this.context.commit("UPDATE_ROLE", role);

      return setNotification(result.message, result.success, this.path);
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ rawError: true })
  public async deleteRole(role_id: number) {
    try {
      const result: IResult = await $axios.$delete(`${this.url}/${role_id}`);

      this.context.commit("DELETE_ROLE", role_id);

      return setNotification(result.message, result.success, this.path);
    } catch (error) {
      return console.log(error.stack);
    }
  }
}
