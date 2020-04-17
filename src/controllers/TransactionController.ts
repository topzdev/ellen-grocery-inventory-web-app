import { Request, Response } from 'express'
import { QueryConfig } from 'pg'
import QueryExtend from "../extends/QueryExtend";
import ITransaction from '../interfaces/ITransaction';


export default class TransactionController extends QueryExtend {

    constructor() {
        super()
        console.log('Transaction Controller');
    }

    async fetchSingleTransaction(req: Request, res: Response) {

        const transact_id = req.params.id;

        try {
            const query: QueryConfig = {
                text: `SELECT 
                transact.transact_id,
                transact.amount_paid,
                transact.total_amount,
                customer.firstname || ' ' || customer.lastname AS customer_name,
                account.firstname || ' ' || account.lastname AS account_name,
                transact.started_at,
                transact.ended_at,
                transact.created_at
                FROM "${this.transactionTable}" transact
                INNER JOIN "${this.customerTable}" customer ON customer.customer_id = transact.customer_id 
                INNER JOIN "${this.accountTable}" account ON account.account_id = transact.account_id
                WHERE transact_id = $1
                LIMIT 1 
                `,
                values: [transact_id]
            }

            const result = await this.executeQuery(query);

            return res.json({
                success: true,
                message: 'Single Transaction Fetched Successfully',
                data: result.rows[0]
            });


        } catch (error) {
            console.error(error.stack);
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later',
            });
        } finally {
            this.pool.end()
        }
    }

    async fetchTransaction(req: Request, res: Response) {
        try {
            const query: QueryConfig = {
                text: `SELECT 
                transact.transact_id,
                transact.amount_paid,
                transact.total_amount,
                customer.firstname || ' ' || customer.lastname AS customer_name,
                account.firstname || ' ' || account.lastname AS account_name,
                transact.started_at,
                transact.ended_at,
                transact.created_at
                FROM "${this.transactionTable}" transact
                INNER JOIN "${this.customerTable}" customer ON customer.customer_id = transact.customer_id 
                INNER JOIN "${this.accountTable}" account ON account.account_id = transact.account_id
                `,
            }

            const result = await this.executeQuery(query);

            return res.json({
                success: true,
                message: 'Transaction Fetched Successfully',
                data: result.rows
            });


        } catch (error) {
            console.error(error.stack);
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later',
            });
        }
    }

    async addTransaction(req: Request, res: Response) {
        const { customer_id, account_id, started_at, ended_at, total_amount, amount_paid, orders }: ITransaction = req.body;
        try {

            await this.executeQuery({ text: 'BEGIN' })

            if (orders.length) {
                for (const { product_id, quantity } of orders) {
                    await this.executeQuery({
                        text: `UPDATE "${this.productTable}" SET quantity = quantity - $1 WHERE product_id = $2`,
                        values: [quantity, product_id]
                    })

                    console.log(product_id, quantity)
                }
            }

            const transactResult = await this.executeQuery({
                text: `INSERT INTO "${this.transactionTable}" 
                (customer_id, account_id, started_at, ended_at, total_amount, amount_paid)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING transact_id`,
                values: [customer_id, account_id, started_at, ended_at, total_amount, amount_paid]
            });


            await this.executeQuery({ text: 'COMMIT' });

            return res.json({
                success: true,
                message: 'Transaction Added',
                data: transactResult.rows[0]
            });
        } catch (error) {
            await this.executeQuery({ text: 'ROLLBACK' })
            console.error(error.stack);
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later',
            });
        }

    }


    async updateTransaction(req: Request, res: Response) {
        const { transact_id, customer_id, account_id, started_at, ended_at, total_amount, amount_paid } = req.body;

        try {
            const query: QueryConfig = {
                text: `UPDATE "${this.transactionTable}" 
                SET customer_id = $1, account_id = $2, started_at = $3, ended_at = $4, total_amount = $5, amount_paid = $6
                WHERE transact_id = $7`,
                values: [customer_id, account_id, started_at, ended_at, total_amount, amount_paid, transact_id]
            }

            const result = await this.executeQuery(query);

            return res.json({
                success: true,
                message: 'Transaction Updated',
                data: result.rows
            });
        } catch (error) {
            console.error(error.stack);
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later',
            });
        } finally {
            this.pool.end()
        }

    }

    async deleteTransaction(req: Request, res: Response) {
        const transact_id = req.params.id

        try {
            const query: QueryConfig = {
                text: `DELETE FROM "${this.transactionTable}" WHERE transact_id = $1`,
                values: [transact_id]
            }

            const result = await this.executeQuery(query);

            return res.json({
                success: true,
                message: 'Transaction Deleted',
                data: result.rows
            });
        } catch (error) {
            console.error(error.stack);
            return res.json({
                success: false,
                message: 'Something went wrong, Please try again later',
            });
        } finally {
            this.pool.end()
        }
    }


}