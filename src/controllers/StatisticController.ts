import { Response, Request } from 'express';
import QueryExtend from '../extends/QueryExtend';
import { QueryConfig } from 'pg';

const timespanCondition = (timespan: string, column: string) => {
    let condition = 'where ';

    switch (timespan) {
        case 'today': condition += `${column} >= now()`
            break;
        case 'recent': condition += `${column} <= now()`
            break;
        case 'last_day': condition += `${column} >= date_trunc('day', now()) - interval '1 day'`
            break;
        case 'this_week': condition += `${column} >= date_trunc('week', now())`
            break;
        case 'this_month': condition += `${column} >= date_trunc('month', now())`
            break;
        case 'last_month': condition += `${column} >= date_trunc('month', now()) - interval '1 month' and ${column} < date_trunc('month', now())`
            break;
        case 'this_year': condition += `${column} >= date_trunc('year', now())`
            break;
        case 'last_year': condition += `${column} >= date_trunc('year', now()) - interval '1 year' and ${column} < date_trunc('year', now())`
            break;

        default: condition = ''
    }

    return condition;
}

export default class StatisticController extends QueryExtend {
    constructor() {
        super();
        console.log('Statistic Controller');
    }

    async getCustomerStatistic(req: Request, res: Response) {
        const { count, timespan, limit } = req.query;

        try {
            const query: QueryConfig = {
                text: `select 
                ${count ? 'count(*)' : `distinct cust.customer_id, cust.firstname || ' ' || cust.lastname as fullname, 
                (select sum(total_amount) from ${this.transactionTable} where customer_id = cust.customer_id) as spend`}
                from ${this.customerTable} ${count ? '' : `cust inner join ${this.transactionTable} transact using (customer_id) 
                ${timespan ? timespanCondition(timespan, 'transact.created_at') : ''}`}
                ${limit ? `limit ${limit}` : ''}`
            }

            const result = await this.executeQuery(query);

            return res.json({
                success: true,
                message: 'Successfly Customer Statistic Fetch',
                data: result.rows
            });
        } catch (error) {
            console.log('Database error', error.stack);
        }
    }


    async getTransactionStatistic(req: Request, res: Response) {

        const { count, timespan, limit, spend } = req.query;


        try {
            const query: QueryConfig = {
                text: `select 
                ${count ? 'count(*)' : ` transact.transact_id, customer.firstname || ' ' || customer.lastname as customer_name, 
                transact.total_amount, transact.amount_paid, transact.created_at`}
                from ${this.transactionTable}
                ${timespan ? `transact inner join ${this.customerTable} customer using (customer_id)` : ''}
                ${timespan ? timespanCondition(timespan, 'transact.created_at') : ''}
                ${limit ? `limit ${limit}` : ''}
                `
            }

            const result = await this.executeQuery(query);

            return res.json({
                success: true,
                message: 'Successfully Statistic Fetch',
                data: result.rows
            });
        } catch (error) {
            console.log('Database error', error.stack);
        }
    }

    async getSalesInterval(req: Request, res: Response) {
        const { timespan } = req.query;

        try {
            const query: QueryConfig = {
                text: `select sum(total_amount) from "${this.transactionTable}" 
                ${timespan ? timespanCondition(timespan, 'created_at') : ''}`
            }

            const result = await this.executeQuery(query);

            return res.json({
                success: true,
                message: 'Successfly Sales Fetch',
                data: result.rows
            });
        } catch (error) {
            console.log('Database error', error.stack);
        }
    }

    async getProductStatistic(req: Request, res: Response) {

        const { count, limit, status } = req.query

        let condition = 'WHERE ';

        switch (status) {
            case 'out_of_stock': condition += 'quantity = 0'
                break;
            case 'critical': condition += 'quantity <= quantity_min'
                break;
            case 'overflowed': condition += 'quantity >= quantity_max'
                break;
        }

        console.log(condition)

        try {
            const query: QueryConfig = {
                text: `select ${count ? 'count(*)' :
                    'product_name, quantity, quantity_max, quantity_min, barcode'} from "${this.productTable}"
            ${ status ? condition : ''}
            ${ limit ? `LIMIT ${limit}` : ''}
            `
            }

            const result = await this.executeQuery(query);

            return res.json({
                success: true,
                message: 'Successfly Product Count Fetch',
                data: result.rows
            });
        } catch (error) {
            console.log('Database error', error.stack);
        }
    }

}

