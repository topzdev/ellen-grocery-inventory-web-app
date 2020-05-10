import AccountModel from "../model/AccountModel";
import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config'
import { IAccount } from "../interfaces";
const model = new AccountModel;

interface IAuthCredentials {
    username: string,
    password: string
}

export default class AuthServices {

    async login({ username, password }: IAuthCredentials) {

        const user = await model.getAccount({ username, email_address: username }, 'or');
        if (!user) return {
            success: false,
            message: 'Account username is not exist'
        }

        console.log(await bycrypt.compare(password, user.password))

        const verifyPassword = await bycrypt.compare(password, user.password);

        if (!verifyPassword) return {
            success: false,
            message: 'Password not match'
        }

        const token = jwt.sign({ account_id: user.account_id, role_id: user.role_id }, config.jwtSecret, { expiresIn: '12hr' })

        console.log(token)

        return {
            token,
            auth: true,
            message: 'Login Successfully'
        }
    }


    async getUser({ account_id }: IAccount) {

        const user = await model.findOne({ account_id });
        if (!user) return {
            success: false,
            auth: false,
            message: 'Account username is not exist'
        }
        return user
    }

}