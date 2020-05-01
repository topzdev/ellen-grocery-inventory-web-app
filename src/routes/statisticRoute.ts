import express, { Request, Response } from 'express';
import DashboardController from '../controllers/StatisticController';
import { checkToken } from '../middleware';

const router = express.Router();
const controller = new DashboardController();

router.get('/overall', checkToken, (req: Request, res: Response) => {
    controller.getOverallStatistic(req, res);
});

router.get('/count', checkToken, (req: Request, res: Response) => {
    controller.getCount(req, res);
});

router.get('/sales', checkToken, (req: Request, res: Response) => {
    controller.getSales(req, res);
});

router.get('/product-status', checkToken, (req: Request, res: Response) => {
    controller.getProductStatus(req, res);
});

router.get('/product-list-by-status', checkToken, (req: Request, res: Response) => {
    controller.getProductListByStatus(req, res);
});

router.get('/customer-list-by-interval', checkToken, (req: Request, res: Response) => {
    controller.getCustomerListByInterval(req, res);
});

router.get('/transaction-list-by-interval', checkToken, (req: Request, res: Response) => {
    controller.getTransactionListByInterval(req, res);
});

export default router;