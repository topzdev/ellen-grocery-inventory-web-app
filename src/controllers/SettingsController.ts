import { Request, Response } from 'express';
import SettingsServices from "../services/SettingsServices";
const settingsServices = new SettingsServices;

export default class SettingsController {
    constructor() {
        console.log('Settings Controller');
    }

    async settingsUpdate(req: Request, res: Response): Promise<any> {
        try {
            const result = await settingsServices.update(req.body);
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later ',
                data: error.stack
            });
        }
    }

} 