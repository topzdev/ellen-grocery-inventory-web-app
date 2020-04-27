import QueryExtend from "../extends/QueryExtend";
import { IFilter, IRole } from "../interfaces";
import { QueryConfig } from "pg";

export default class RoleModel extends QueryExtend {

    async findMany({ search, limit, offset }: IFilter): Promise<IRole[]> {
        const query: QueryConfig = {
            text: `SELECT * FROM ${this.roleTable}
			${this.analyzeFilter('role_name', { search, limit, offset })}`
        };
        const result = await this.executeQuery(query);
        return result.rows;
    }

    async findOne(columns: object, condition?: string): Promise<IRole> {
        const query: QueryConfig = {
            text: `SELECT * FROM ${this.roleTable} ${this.analyzeCondition(columns, condition)} limit 1`,
        };
        const result = await this.executeQuery(query);
        return result.rows[0]
    }

    async create(role_name: IRole) {
        let query: QueryConfig = {
            text: `INSERT INTO ${this.roleTable} (role_name) VALUES ($1) RETURNING role_id`,
            values: [role_name]
        }

        const result = await this.executeQuery(query);
        return result.rows[0].role_id
    }

    async update(id: IRole['role_id'], { role_name }: IRole): Promise<IRole['role_id']> {
        const query: QueryConfig = {
            text: `UPDATE ${this.roleTable} SET role_name = $1 WHERE role_id = $2`,
            values: [role_name, id]
        };

        const result = await this.executeQuery(query);
        return id
    }

    async delete(id: IRole['role_id']): Promise<IRole['role_id']> {
        const query: QueryConfig = {
            text: `DELETE FROM ${this.roleTable} WHERE role_id = $1 `,
            values: [id]
        };
        const result = await this.executeQuery(query);
        return id;
    }


}