import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import ITransaction from '~/interfaces/ITransaction'
import { SET_TRANSACTION, ADD_TRANSACTION } from '~/configs/types';
import IFilter from '~/interfaces/IFilter';
import { $axios } from '~/utils/axios';
import filterGenerator from '~/utils/filterGenerator';
import config from '~/configs/axiosConfig';
import { frontendStore } from '~/utils/store-accessor';
import IResult from '~/interfaces/IResult';


@Module({
    name: 'transaction',
    namespaced: true
})
export default class Transaction extends VuexModule {
    private url: string = "/api/transaction";
    private path: string = "/transactions";
    private transactions: Array<ITransaction> = [];

    get getTransactions() {
        return this.transactions;
    }

    @Mutation
    [SET_TRANSACTION](transactions: Array<ITransaction>) {
        this.transactions = transactions;
    }
    @Mutation
    [ADD_TRANSACTION](transaction: ITransaction) {
        this.transactions = [transaction, ...this.transactions]
    }

    @Action({ commit: SET_TRANSACTION })
    async fetchTransactions(filter: IFilter) {
        try {
            const result: IResult = await $axios.$get(this.url + filterGenerator(filter), config);
            return result.data;
        } catch (error) {
            console.log(error);
            frontendStore.setSnackbar({ message: error.response.data.message, success: false });
        }
    }

    @Action({ commit: ADD_TRANSACTION })
    async addTransaction(transaction: ITransaction) {
        try {
            const result: IResult = await $axios.$post(this.url, transaction, config);
            frontendStore.setSnackbar({ message: result.message, success: result.success });
            return { ...transaction, transact_id: result.data.transact_id };
        } catch (error) {
            console.log(error);
            frontendStore.setSnackbar({ message: error.response.data.message, success: false });
        }
    }
}