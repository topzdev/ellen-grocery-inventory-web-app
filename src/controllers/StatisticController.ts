import { Response, Request } from 'express';
import QueryExtend from '../extends/QueryExtend';
import { QueryConfig } from 'pg';



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
                ${timespan ? this.timespanCondition(timespan, 'transact.created_at') : ''}`}
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
                ${timespan ? this.timespanCondition(timespan, 'transact.created_at') : ''}
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
                text: `select sum(total_amount), count(*) from "${this.transactionTable}" 
                ${timespan ? this.timespanCondition(timespan, 'created_at') : ''}`
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

    async getOverallStatistic(req: Request, res: Response) {

        try {
            await this.executeQuery({ text: 'BEGIN' })

            let this_month_sales = await this.executeQuery({ text: `select sum(total_amount), count(*) from "${this.transactionTable}" ${this.timespanCondition('this_month', 'created_at')}` })
            let last_month_sales = await this.executeQuery({ text: `select sum(total_amount), count(*) from "${this.transactionTable}" ${this.timespanCondition('last_month', 'created_at')}` })
            let this_year_sales = await this.executeQuery({ text: `select sum(total_amount), count(*) from "${this.transactionTable}" ${this.timespanCondition('this_year', 'created_at')}` })
            let last_year_sales = await this.executeQuery({ text: `select sum(total_amount), count(*) from "${this.transactionTable}" ${this.timespanCondition('last_year', 'created_at')}` })
            let out_of_stock = await this.executeQuery({ text: `select count(*) from ${this.productTable} where quantity = 0` })
            let critical = await this.executeQuery({ text: `select count(*) from ${this.productTable} where quantity <= quantity_min` })
            let product_count = await this.executeQuery({ text: `select count(*) from ${this.productTable}` })
            let transaction_count = await this.executeQuery({ text: `select count(*) from ${this.transactionTable}` })
            let customer_count = await this.executeQuery({ text: `select count(*) from ${this.customerTable}` })

            await this.executeQuery({ text: 'COMMIT' })
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

