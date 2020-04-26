import { $axios } from '~/utils/axios';
import { IFilter, IResult } from '~/interfaces';
import filterGenerator from '~/utils/filterGenerator';


export default class StatisticAPI {
    private url = 'api/statistic'

    /**
     * @param {IFilter} filter - set of filter for filtering out the data to be return
     * @param {string} [filter.timespan] - return a data within specific data ['today', 'recent', 'this_week','this_month', 'this_year', 'last_year]
     * @param {boolean} [filter.count] - return current count of table
     * @param {number} [filter.limit] - limit the row count to return 
     */
    async getCustomer(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}/customer${filterGenerator(filter)}`)
        return result;
    }

    async getTransaction(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}/transaction${filterGenerator(filter)}`)
        return result;
    }

    async getSales(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}/sales${filterGenerator(filter)}`)
        return result;
    }
    async getProduct(filter: IFilter) {
        const result: IResult = await $axios.$get(`${this.url}/product${filterGenerator(filter)}`)
        return result;
    }
}