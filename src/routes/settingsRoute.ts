import Express from 'express';
import { Request, Response } from 'express';
import SettingsController from '../controllers/SettingsController';
const router = Express.Router()

const controller = new SettingsController;

router.put('/', (req: Request, res: Response) => {
    controller.settingsUpdate(req, res);
})


export default router;