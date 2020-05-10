import AuthController from '../controllers/AuthController';
import Express, { Request, Response } from 'express'
import { checkToken } from '../middleware';
const router = Express.Router();

const controller = new AuthController;

router.post('/login', (req: Request, res: Response) => {
    controller.login(req, res);
})

router.post('/logout', (req: Request, res: Response) => {
    controller.logout(req, res)
})

router.get('/user', checkToken, (req: Request, res: Response) => {
    controller.fetchUser(req, res);
})




export default router;