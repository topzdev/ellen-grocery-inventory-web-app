import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import IRole from "~/interfaces/IRole";
import { $axios } from "~/utils/axios";
import config from "~/configs/axiosConfig";
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

  @Action({ commit: "SET_ROLE" })
  public async searchRoles(search: string) {
    try {
      const result: IResult = await $axios.$get(`${this.url}/search`);
      return result.data;
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ commit: "SET_ROLE" })
  public async fetchRoles() {
    try {
      const result: IResult = await $axios.$post(`${this.url}`);
      setNotification(result.message, result.success, this.path);
      return result.data;
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ commit: "ADD_ROLE" })
  public async addRole(role: IRole) {
    try {
      const result: IResult = await $axios.$post(`${this.url}`, role, config);
      setNotification(result.message, result.success, this.path);
      return {
        role_id: result.data.role_id,
        ...role
      };
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ commit: "UPDATE_ROLE" })
  public async updateRole(role: IRole) {
    try {
      const result: IResult = await $axios.$put(`${this.url}`, role, config);
      setNotification(result.message, result.success, this.path);
      return role;
    } catch (error) {
      return console.log(error.stack);
    }
  }

  @Action({ commit: "DELETE_ROLE" })
  public async deleteRole(role_id: number) {
    try {
      const result: IResult = await $axios.$delete(`${this.url}/${role_id}`);
      setNotification(result.message, result.success, this.path);
      return role_id;
    } catch (error) {
      return console.log(error.stack);
    }
  }
}
