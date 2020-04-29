import { $axios } from "~/utils/axios";
import filterGenerator from '~/utils/filterGenerator';
import config from "~/configs/axiosConfig";
import { IResult, IFilter, ICustomer } from '~/interfaces';

export default class CustomerAPI {
    private url: string = "/api/customer";

    async fetchSingleCustomer(customer_id: ICustomer['customer_id']) {
        const result: IResult = await $axios.$get(`${this.url}/${customer_id}`);
        return result;
    }

    async fetchCustomers(filter: IFilter) {
        console.log(this.url + filterGenerator(filter))
        const result: IResult = await $axios.$get(this.url + filterGenerator(filter));
        return result;
    }

    async addCustomer(customer: ICustomer) {
        const result: IResult = await $axios.$post(this.url, customer, config);
        console.log(result);
        return result;
    }

    async updateCustomer(customer: ICustomer) {
        const result: IResult = await $axios.$put(this.url, customer, config);
        return result;
    }

    async deleteCustomer(customer_id: ICustomer['customer_id']) {
        const result: IResult = await $axios.$delete(`${this.url}/${customer_id}`);
        return result;
    }

}