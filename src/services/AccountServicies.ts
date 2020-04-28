import bcrypt from 'bcryptjs';
import AccountModel from "../model/AccountModel";
import { IAccount, IFilter } from "../interfaces";
import IPassword from "../interfaces/IPassword";

const accountModel = new AccountModel;
export default class AccountServices {

    async getOne(account_id: IAccount['account_id']) {
        const result = await accountModel.findOne({ account_id })

        return {
            message: 'Account Successfully Fetched',
            data: result
        }
    }

    async getMany(filter: IFilter) {
        const result = await accountModel.findMany(filter);
        return {
            message: 'Accounts Successfully Fetched',
            data: result
        }
    }

    async create(account: IAccount) {
        const isExist = await accountModel.findOne({ username: account.username })

        if (isExist) return {
            success: false,
            message: 'Username Already Exist'
        }

        const password = await bcrypt.hash(account.password, 10);
        const result = await accountModel.create({ ...account, password })

        return {
            message: 'Account Successfully Added',
            data: result
        }
    }

    async update(account: IAccount) {
        const isExist = await accountModel.findOne({ username: account.username })

        if (isExist) return {
            success: false,
            message: 'Username is already Exist'
        }

        const result = await accountModel.update(account.account_id, account);

        return {
            message: 'Account Successfully Updated',
            data: result
        }

    }

    async updatePassword({ account_id, current_password, new_password }: IPassword) {
        const account = await accountModel.getAccount(account_id);

        if (!account) return {
            message: 'Account not found',
            success: false,
        }

        if (!await bcrypt.compare(current_password, account.password)) return {
            message: 'Current Password not match',
            success: false,
        };

        if (await bcrypt.compare(new_password, account.password)) return {
            message: 'You cannot use the previous password',
            success: false,
        };

        const password = await bcrypt.hash(new_password, 10);

        const result = await accountModel.update(account_id, { password })

        return {
            message: 'Password Successfully Updated',
            data: result
        }
    }

    async remove(id: IAccount['account_id']) {
        const result = await accountModel.remove(id);

        return {
            message: 'Account Successfully Removed',
        };
    }

    async delete(id: IAccount['account_id']) {
        const result = await accountModel.delete(id);

        return {
            message: 'Account Successfully Delete adminly',
        }
    }
}