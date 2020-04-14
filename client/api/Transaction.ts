import { $axios } from "~/utils/axios";
import filterGenerator from '~/utils/filterGenerator';
import config from "~/configs/axiosConfig";
import { IFilter, ITransaction, IResult } from '~/interfaces';


export default class TransactionAPI {
    private url: string = "/api/transaction";

    async fetchTransactions(filter: IFilter) {
        const result: IResult = await $axios.$get(this.url + filterGenerator(filter), config);
        return result;
    }

    async addTransaction(transaction: ITransaction) {
        const result: IResult = await $axios.$post(this.url, transaction, config);
        return result;
    }
}