import QueryExtend from "../extends/QueryExtend";
import { ITransaction, IFilter } from "../interfaces";
import { QueryConfig } from "pg";


export default class TransactionMode extends QueryExtend {

    async findOne(column: object, condition?: string): Promise<ITransaction> {
        const query: QueryConfig = {
            text: `SELECT 
            transact.transact_id,
            transact.amount_paid,
            transact.total_amount,
            customer.firstname || ' ' || customer.lastname AS customer_name,
            account.firstname || ' ' || account.lastname AS account_name,
            customer.points,
            transact.started_at,
            transact.ended_at,
            transact.created_at,
            transact.customer_id,
            transact.account_id
            FROM "${this.transactionTable}" transact
            INNER JOIN "${this.customerTable}" customer ON customer.customer_id = transact.customer_id 
            INNER JOIN "${this.accountTable}" account ON account.account_id = transact.account_id
            ${this.analyzeCondition(column, condition)}
            LIMIT 1 `,
        }

        const result = await this.executeQuery(query);
        return result.rows[0]
    }

    async findMany({ recent, order, order_by }: IFilter): Promise<ITransaction[]> {
        const query: QueryConfig = {
            text: `SELECT 
            transact.transact_id,
            transact.amount_paid,
            transact.total_amount,
            customer.firstname || ' ' || customer.lastname AS customer_name,
            account.firstname || ' ' || account.lastname AS account_name,
            customer.points,
            transact.started_at,
            transact.ended_at,
            transact.created_at,
            transact.customer_id,
            transact.account_id
            FROM "${this.transactionTable}" transact
            INNER JOIN "${this.customerTable}" customer ON customer.customer_id = transact.customer_id 
            INNER JOIN "${this.accountTable}" account ON account.account_id = transact.account_id
            ${recent ? 'WHERE ' + this.intervalCondition('this_day', 'transact.ended_at') : ''}
            ${order_by ? `ORDER BY transact.${order_by} ${order}` : ''}
            `,
        }
        const result = await this.executeQuery(query);
        return result.rows
    }

    async create({ customer_id, account_id, started_at, ended_at, total_amount, amount_paid, orders, points }: ITransaction): Promise<ITransaction['transact_id']> {
        try {
            await this.executeQuery({ text: 'BEGIN' })

            if (orders.length) {
                for (const { product_id, quantity } of orders) {
                    await this.executeQuery({
                        text: `UPDATE ${this.productTable} SET quantity = quantity - $1 WHERE product_id = $2`,
                        values: [quantity, product_id]
                    })
                }
            }

            if (customer_id && points) {
                await this.executeQuery({
                    text: `UPDATE ${this.customerTable} SET points = points + $1 WHERE customer_id = $2`,
                    values: [points, customer_id]
                })
            }

            const result = await this.executeQuery({
                text: `INSERT INTO ${this.transactionTable} 
                (customer_id, account_id, started_at, ended_at, total_amount, amount_paid)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING transact_id`,
                values: [customer_id, account_id, started_at, ended_at, total_amount, amount_paid]
            });

            await this.executeQuery({ text: 'COMMIT' });
            return result.rows[0].transact_id
        } catch (error) {
            await this.executeQuery({ text: 'ROLLBACK' })
            throw Error(error)
        }
    }

    async update(id: ITransaction['transact_id'], transaction: ITransaction): Promise<ITransaction['transact_id']> {
        const query: QueryConfig = {
            text: `UPDATE ${this.transactionTable} ${this.queryfields(transaction, 'update')}
            where transact_id = $1`,
            values: [id]
        }
        const result = await this.executeQuery(query);
        return id;
    }

    async delete(id: ITransaction['transact_id']): Promise<ITransaction['transact_id']> {
        const query: QueryConfig = {
            text: `DELETE FROM ${this.transactionTable} WHERE transact_id = $1`,
            values: [id]
        }
        const result = await this.executeQuery(query);
        return id;
    }
}