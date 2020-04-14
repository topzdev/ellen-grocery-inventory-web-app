import { $axios } from "~/utils/axios";
import filterGenerator from '~/utils/filterGenerator';
import config from "~/configs/axiosConfig";
import { IFilter, IResult, IRole } from '~/interfaces';

export default class RoleAPI {
    private url: string = "/api/role";

    async fetchRoles(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}${filterGenerator(filter)}`, config);
        return result;
    }

    async addRole(role: IRole) {
        const result: IResult = await $axios.$post(`${this.url}`, role, config);
        return result;
    }

    async updateRole(role: IRole) {
        const result: IResult = await $axios.$put(`${this.url}`, role, config);
        return result;
    }

    async deleteRole(role_id: IRole['role_id']) {
        const result: IResult = await $axios.$delete(`${this.url}/${role_id}`);
        return result;
    }
}