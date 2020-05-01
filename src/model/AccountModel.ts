import QueryExtend from "../extends/QueryExtend"
import { IFilter, IAccount } from "../interfaces";
import { QueryConfig } from "pg";

export default class AccountModel extends QueryExtend {

    async count({ show_deleted }: IFilter): Promise<string> {
        const query: QueryConfig = {
            text: `SELECT count(*)
            from ${this.accountTable} 
            ${this.analyzeFilter('', { show_deleted })}`
        }
        const result = await this.executeQuery(query);
        return result.rows[0].count;
    }

    async findMany({ search, limit, offset, show_deleted }: IFilter): Promise<IAccount[]> {

        const query: QueryConfig = {
            text: `SELECT
			account.account_id,
			account.firstname || ' ' || account.lastname AS fullname,
			account.username,
			role.role_name
			FROM ${this.accountTable} account INNER JOIN "${this.roleTable}" role ON role.role_id = account.role_id
            ${this.analyzeFilter("account.firstname || ' ' || account.lastname", { search, show_deleted })}
            ${this.limitRows({ limit, offset })}`
        };

        const result = await this.executeQuery(query);
        return result.rows;
    }

    async findOne(columns: object, condition?: string): Promise<IAccount> {
        const query: QueryConfig = {
            text: `SELECT 
			account_id,
			firstname,
			lastname,
			middlename,
			username, 
			email_address,
            role_id,
            role.role_name
            FROM ${this.accountTable} 
            inner join ${this.roleTable} role using(role_id)
            ${this.analyzeCondition(columns, condition)} limit 1`,
        };

        const result = await this.executeQuery(query);
        return result.rows[0];
    }

    async create(account: IAccount): Promise<IAccount['account_id']> {
        const query: QueryConfig = {
            text: `INSERT INTO ${this.accountTable} ${this.queryfields(account, 'insert')} RETURNING account_id`,
        };

        const result = await this.executeQuery(query);

        return result.rows[0].account_id
    }

    async update(id: IAccount['account_id'], account: IAccount): Promise<IAccount['account_id']> {
        const query: QueryConfig = {
            text: `UPDATE ${this.accountTable} ${this.queryfields(account, 'update')}
            WHERE account_id = $1 `,
            values: [id]
        };
        const result = await this.executeQuery(query);
        return id
    }

    async remove(id: IAccount['account_id']): Promise<IAccount['account_id']> {
        const query: QueryConfig = {
            text: `UPDATE ${this.accountTable} SET is_deleted = TRUE WHERE account_id = $1`,
            values: [id]
        };
        const result = await this.executeQuery(query);
        return id;
    }

    async getAccount(columns: object, condition?: string | undefined): Promise<IAccount> {
        const query: QueryConfig = {
            text: `SELECT 
            account_id,
            role_id,
            password 
            from ${this.accountTable} ${this.analyzeCondition(columns, condition)} LIMIT 1`,
        }

        const result = await this.executeQuery(query);
        return result.rows[0]
    }

    async delete(id: IAccount['account_id']): Promise<IAccount['account_id']> {
        const query: QueryConfig = {
            text: `DELETE FROM ${this.accountTable} WHERE account_id = $1`,
            values: [id]
        };
        const result = await this.executeQuery(query);
        return id;
    }

}