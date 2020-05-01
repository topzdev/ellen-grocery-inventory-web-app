import AuthServices from "../services/AuthServices";
import { Request, Response } from 'express'
const authServices = new AuthServices;

export default class AuthController {
    constructor() {
        console.log('Auth Controller');
    }
    async login(req: Request, res: Response) {
        try {
            const result = await authServices.login(req.body);
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later ',
                data: error.stack
            });
        }
    }

    async fetchUser(req: Request, res: Response) {
        try {
            console.log('Res Local Users', res.locals.user);
            const result = await authServices.getUser(res.locals.user);
            return res.json(result);
        } catch (error) {
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later ',
                data: error.stack
            });
        }
    }
}