import express, { Request, Response } from 'express';
import DashboardController from '../controllers/StatisticController';

const router = express.Router();
const controller = new DashboardController();

router.get('/overall', (req: Request, res: Response) => {
    controller.getOverallStatistic(req, res);
});

router.get('/count', (req: Request, res: Response) => {
    controller.getCount(req, res);
});

router.get('/sales', (req: Request, res: Response) => {
    controller.getSales(req, res);
});

router.get('/product-status', (req: Request, res: Response) => {
    controller.getProductStatus(req, res);
});

router.get('/product-list-by-status', (req: Request, res: Response) => {
    controller.getProductListByStatus(req, res);
});

router.get('/customer-list-by-interval', (req: Request, res: Response) => {
    controller.getCustomerListByInterval(req, res);
});

router.get('/transaction-list-by-interval', (req: Request, res: Response) => {
    controller.getTransactionListByInterval(req, res);
});

export default router;