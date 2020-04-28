import { Response, Request } from 'express';
import QueryExtend from '../extends/QueryExtend';
import { QueryConfig } from 'pg';
import StatisticServices from '../services/StatisticServices';

const statisServices = new StatisticServices;

export default class StatisticController {
    constructor() {
        console.log('Statistic Controller');
    }

    async getOverallStatistic(req: Request, res: Response) {
        try {
            const result = await statisServices.overall();
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later ',
                data: error.stack
            });
        }
    }

    async getCount(req: Request, res: Response) {
        try {
            const result = await statisServices.countOverall();
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later ',
                data: error.stack
            });
        }
    }

    async getSales(req: Request, res: Response) {
        try {
            const result = await statisServices.salesOverall();
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later ',
                data: error.stack
            });
        }
    }

    async getProductStatus(req: Request, res: Response) {
        try {
            const result = await statisServices.productStatusOverall();
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later ',
                data: error.stack
            });
        }
    }

    async getProductListByStatus(req: Request, res: Response) {
        try {
            const result = await statisServices.productListByStatus(req.query);
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later ',
                data: error.stack
            });
        }
    }

    async getCustomerListByInterval(req: Request, res: Response) {
        try {
            const result = await statisServices.customerListByInterval(req.query);
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later ',
                data: error.stack
            });
        }
    }

    async getTransactionListByInterval(req: Request, res: Response) {
        try {
            const result = await statisServices.transactionListByInterval(req.query);
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

