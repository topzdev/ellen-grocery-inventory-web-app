import { $axios } from '~/utils/axios';
import { IFilter, IResult } from '~/interfaces';
import filterGenerator from '~/utils/filterGenerator';


export default class StatisticAPI {
    private url = 'api/statistic'

    async getOverall() {
        const result: IResult = await $axios.$get(`${this.url}/overall`)
        return result;
    }

    async getCount() {
        const result: IResult = await $axios.$get(`${this.url}/count`)
        return result;
    }

    async getSales() {
        const result: IResult = await $axios.$get(`${this.url}/sales`)
        return result;
    }

    async getProductStatus() {
        const result: IResult = await $axios.$get(`${this.url}/product-status`)
        return result;
    }

    async getProductListByStatus(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}/product-list-by-status${filterGenerator(filter)}`)
        return result;
    }

    async getCustomerListByInterval(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}/customer-list-by-interval${filterGenerator(filter)}`)
        return result;
    }

    async getTransactionListByInterval(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}/transaction-list-by-interval${filterGenerator(filter)}`)
        return result;
    }
}