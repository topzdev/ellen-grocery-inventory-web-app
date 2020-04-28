import { IFilter, ITransaction } from "../interfaces";
import TransactioModel from '../model/TransactionModel'

const transactionModel = new TransactioModel;

export default class TransactionServices {
    async getMany(filter: IFilter) {
        const result = await transactionModel.findMany(filter);
        return {
            message: 'Transaction Fetched Successfully',
            data: result
        }
    }
    async getOne(transact_id: ITransaction['transact_id']) {
        const result = await transactionModel.findOne({ transact_id });
        return {
            message: 'Single Transaction Fetched Successfully',
            data: result
        }
    }

    async create(transaction: ITransaction) {
        const result = await transactionModel.create(transaction);
        return {
            message: 'Transaction Added Succcessfully',
            data: result
        }
    }

    async update(transaction: ITransaction) {
        const result = await transactionModel.update(transaction.account_id, transaction);
        return {
            message: 'Transaction Updated Succcessfully',
            data: result
        }
    }

    async delete(id: ITransaction['transact_id']) {
        const result = await transactionModel.delete(id);
        return {
            message: 'Transaction Deleted Succcessfully',
            data: result
        }
    }
}