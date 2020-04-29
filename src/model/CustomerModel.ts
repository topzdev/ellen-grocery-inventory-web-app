import QueryExtend from "../extends/QueryExtend";
import { IFilter, ICustomer } from "../interfaces";
import { QueryConfig } from "pg";

export default class CustomerModel extends QueryExtend {

    async findMany({ search, limit, offset, transact_count, last_transact, show_deleted }: IFilter): Promise<ICustomer[]> {
        const query: QueryConfig = {
            text: `SELECT 
            customer.customer_id,
            customer.firstname ||' '|| customer.lastname AS fullname,
            customer.home_address,
            customer.email_address,
            customer.points
            ${transact_count ? ',(select count(*) from transaction_table transact WHERE customer_id = customer.customer_id ) AS transact_count' : ''}
            ${last_transact ? ',(select max(ended_at) from transaction_table transact WHERE customer_id = customer.customer_id ) AS last_transact' : ''}
			FROM ${this.customerTable} customer ${this.analyzeFilter("firstname ||' '|| lastname", { search, show_deleted })}
            ${this.orderRows({ order_by: "transact_count", order: 'DESC' })}${this.limitRows({ limit, offset })} `
        };
        console.log(query.text)
        const result = await this.executeQuery(query);
        return result.rows;
    }

    async findOne(columns: object, condition?: string): Promise<ICustomer> {
        const query: QueryConfig = {
            text: `SELECT * FROM ${this.customerTable} ${this.analyzeCondition(columns, condition)} limit 1`,
        };

        const result = await this.executeQuery(query);
        return result.rows[0];
    }

    async create(customer: ICustomer): Promise<ICustomer['customer_id']> {
        const query: QueryConfig = {
            text: `INSERT INTO ${this.customerTable} ${this.queryfields(customer, 'insert')} RETURNING customer_id, firstname || ' ' || lastname as fullname`,
        };

        const result = await this.executeQuery(query);
        return result.rows[0].customer_id;
    }

    async update(id: ICustomer['customer_id'], customer: ICustomer): Promise<ICustomer['customer_id']> {
        const query: QueryConfig = {
            text: `UPDATE ${this.customerTable} ${this.queryfields(customer, 'update')} WHERE customer_id = $1`
            , values: [id]
        };

        const result = await this.executeQuery(query);
        return id;
    }

    async remove(id: ICustomer['customer_id']): Promise<ICustomer['customer_id']> {
        const query: QueryConfig = {
            text: `UPDATE ${this.customerTable} SET is_deleted11 = TRUE WHERE customer_id = $1`,
            values: [id]
        };

        const result = await this.executeQuery(query);
        return id;
    }

    async delete(id: ICustomer['customer_id']): Promise<ICustomer['customer_id']> {
        const query: QueryConfig = {
            text: `DELETE FROM ${this.customerTable} WHERE customer_id = $1`,
            values: [id]
        };

        const result = await this.executeQuery(query);
        return id;
    }
}