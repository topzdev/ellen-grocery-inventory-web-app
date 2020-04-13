import TransactionAPI from '~/api/Transaction';
import { frontendStore } from '~/utils/store-accessor';
import { ITransaction, IFilter } from '~/interfaces';
import { SET_TRANSACTION, ADD_TRANSACTION } from '~/configs/types';
import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'

const transactionApi = new TransactionAPI;

@Module({ name: 'transaction', namespaced: true })
export default class Transaction extends VuexModule {
    private path: string = "/transactions";
    private transactions: ITransaction[] = [];

    get getTransactions() {
        return this.transactions;
    }

    @Mutation
    [SET_TRANSACTION](transactions: ITransaction[]) {
        this.transactions = transactions;
    }
    @Mutation
    [ADD_TRANSACTION](transaction: ITransaction) {
        this.transactions = [transaction, ...this.transactions]
    }

    @Action({ commit: SET_TRANSACTION })
    async fetchTransactions(filter: IFilter) {
        const result = await transactionApi.fetchTransactions(filter);
        return result.data;
    }

    @Action({ commit: ADD_TRANSACTION })
    async addTransaction(transaction: ITransaction) {
        const result = await transactionApi.addTransaction(transaction);

        frontendStore.setSnackbar({ message: result.message, success: result.success });

        return { ...transaction, transact_id: result.data.transact_id };
    }
}