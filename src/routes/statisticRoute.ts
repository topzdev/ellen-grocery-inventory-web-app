import express, { Request, Response } from 'express';
import DashboardController from '../controllers/StatisticController';

const router = express.Router();
const controller = new DashboardController();


router.get('/product', (req: Request, res: Response) => {
    controller.getProductStatistic(req, res);
});

router.get('/sales', (req: Request, res: Response) => {
    controller.getSalesInterval(req, res);
});

router.get('/customer', (req: Request, res: Response) => {
    controller.getCustomerStatistic(req, res);
});

router.get('/transaction', (req: Request, res: Response) => {
    controller.getTransactionStatistic(req, res);
});

export default router;