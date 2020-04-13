import { $axios } from "~/utils/axios";
import filterGenerator from '~/utils/filterGenerator';
import config from "~/configs/axiosConfig";
import { IAccount, IResult, IFilter, IPasswords } from '~/interfaces';


export default class AccountAPI {
    private url: string = "/api/account";

    async fetchAccounts(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}${filterGenerator(filter)}`);
        return result;
    }

    async fetchSingleAccount(account_id: IAccount['account_id']) {
        const result: IResult = await $axios.$get(`${this.url}/${account_id}`);
        return result.data;
    }

    async addAccount(account: IAccount) {
        const result: IResult = await $axios.$post(`${this.url}`, account, config);
        return result;
    }

    async updateAccount(account: IAccount) {
        const result: IResult = await $axios.$put(`${this.url}`, account, config);
        return result;
    }

    async updatePassword(passwords: IPasswords) {
        const result: IResult = await $axios.$put(`${this.url}/password`, passwords, config);
        return result;
    }

    async deleteAccount(account_id: number) {
        const result: IResult = await $axios.$delete(`${this.url}/${account_id}`);
        return result;
    }
}