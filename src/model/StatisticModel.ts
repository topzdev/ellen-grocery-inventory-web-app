import QueryExtend from "../extends/QueryExtend";
import { IFilter } from "../interfaces";
import { QueryConfig } from "pg";

export default class StatisticModel extends QueryExtend {
    private productStatuses(status: IFilter['status']) {
        let condition = '';
        switch (status) {
            case 'out_of_stock': condition += 'quantity = 0'
                break;
            case 'critical': condition += 'quantity <= quantity_min'
                break;
            case 'overflowed': condition += 'quantity >= quantity_max'
                break;
        }
        return condition;
    }

    async salesByInterval({ interval }: IFilter) {
        const query: QueryConfig = {
            text: `select sum(total_amount), count(*) from "${this.transactionTable}" 
            where ${interval ? this.intervalCondition(interval, 'created_at') : ''}`
        }
        const result = await this.executeQuery(query);
        return result.rows[0];
    }

    async transactionCount(interval: IFilter['interval']) {
        const query: QueryConfig = {
            text: `select count(*) from ${this.transactionTable} 
             ${interval ? 'where ' + this.intervalCondition(interval, 'created_at') : ''}`
        }
        const result = await this.executeQuery(query);
        return result.rows[0].count;
    }

    async productCount(interval: string) {
        const query: QueryConfig = {
            text: `select count(*) from ${this.productTable} 
             ${interval ? 'where ' + this.intervalCondition(interval, 'created_at') : ''}`
        }
        const result = await this.executeQuery(query);
        return result.rows[0].count;
    }

    async customerCount(interval: string) {
        const query: QueryConfig = {
            text: `select count(*) 
            from ${this.customerTable} 
             ${interval ? 'where ' + this.intervalCondition(interval, 'created_at') : ''}`
        }
        const result = await this.executeQuery(query);
        return result.rows[0].count;
    }

    async productCountByStatus(status: IFilter['status']) {
        const query: QueryConfig = {
            text: `select count(*) from "${this.productTable}" where ${this.productStatuses(status)} `
        }
        const result = await this.executeQuery(query);
        return result.rows[0].count;
    }

    async productListByStatus({ status, limit }: IFilter) {
        const query: QueryConfig = {
            text: `select 
            product_name, 
            quantity, 
            quantity_max, 
            quantity_min, 
            barcode 
            from "${this.productTable}" 
            where ${this.productStatuses(status)}
            ${limit ? `limit ${limit}` : ''} `
        }
        const result = await this.executeQuery(query);
        return result.rows;
    }

    async customerListByInterval({ interval }: IFilter) {
        const query: QueryConfig = {
            text: `select distinct 
            cust.customer_id, 
            cust.firstname || ' ' || cust.lastname as fullname, 
            (select sum(total_amount) from ${this.transactionTable} where customer_id = cust.customer_id) as spend  
            from ${this.customerTable} cust 
            where ${this.intervalCondition(interval, 'created_at')}`
        }
        const result = await this.executeQuery(query);
        return result.rows;
    }

    async transactionListByInterval({ interval, limit }: IFilter) {
        const query: QueryConfig = {
            text: `select  
            transact.transact_id, 
            customer.firstname || ' ' || customer.lastname as customer_name, 
            transact.total_amount, 
            transact.amount_paid, 
            transact.created_at,
            customer.points
            from ${this.transactionTable}
            transact inner join ${this.customerTable} customer using (customer_id)
            where  ${this.intervalCondition(interval, 'transact.created_at')}
            ${limit ? `limit ${limit}` : ''}`
        }
        const result = await this.executeQuery(query);
        return result.rows;
    }
}