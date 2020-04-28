import { Request, Response } from 'express'
import TransactionServices from '../services/TransactionServices';

const transactionServices = new TransactionServices;

export default class TransactionController {

    constructor() {
        console.log('Transaction Controller');
    }

    async fetchSingleTransaction(req: Request, res: Response) {
        try {
            const result = await transactionServices.getOne(parseInt(req.params.id))
            return res.json({ success: true, ...result });
        } catch (error) {
            console.error(error.stack);
            return res.status(400).json({
                success: false,
                message: 'Something went wrong, Please try again later',
            });
        }
    }

    async fetchTransaction(req: Request, res: Response) {
        try {
            const result = await transactionServices.getMany(req.query)
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong, Please try again later',
                data: error
            });
        }
    }

    async addTransaction(req: Request, res: Response) {
        try {
            const result = await transactionServices.create(req.body)
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong, Please try again later',
                data: error
            });
        }
    }


    async updateTransaction(req: Request, res: Response) {
        try {
            const result = await transactionServices.update(req.body)
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong, Please try again later',
                data: error
            });
        }

    }

    async deleteTransaction(req: Request, res: Response) {
        try {
            const result = await transactionServices.delete(req.params.id)
            return res.json({ success: true, ...result });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'Something went wrong, Please try again later',
                data: error
            });
        }
    }

}