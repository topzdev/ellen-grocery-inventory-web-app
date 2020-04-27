import QueryExtend from "../extends/QueryExtend";
import { IFilter, IBrand } from "../interfaces";
import { QueryConfig } from "pg";

export default class BrandModel extends QueryExtend {

    async findOne(columns: object, condition?: string): Promise<IBrand> {
        const query: QueryConfig = {
            text: `SELECT * FROM ${this.brandTable} ${this.analyzeCondition(columns, condition)} limit 1`,
        };
        const result = await this.executeQuery(query);
        return result.rows[0];
    }


    async findMany({ search, limit, offset }: IFilter): Promise<IBrand[]> {
        const query: QueryConfig = {
            text: `SELECT * FROM ${this.brandTable} ${this.analyzeFilter('brand_name', { search, limit, offset })}`
        };
        const result = await this.executeQuery(query);
        return result.rows;
    }

    async create({ brand_name }: IBrand): Promise<IBrand['brand_id']> {
        const query: QueryConfig = {
            text: `INSERT INTO ${this.brandTable} (brand_name) values ($1) RETURNING brand_id`,
            values: [brand_name]
        };
        const result = await this.executeQuery(query);
        return result.rows[0].brand_id;
    }

    async update(id: IBrand['brand_id'], { brand_name }: IBrand): Promise<IBrand['brand_id']> {
        const query: QueryConfig = {
            text: `UPDATE ${this.brandTable} SET brand_name = $1 WHERE brand_id = $2`,
            values: [brand_name, id]
        };
        const result = await this.executeQuery(query);
        return id;
    }

    async delete(id: IBrand['brand_id']): Promise<IBrand['brand_id']> {
        const query: QueryConfig = {
            text: `DELETE FROM ${this.brandTable} WHERE brand_id = $1`,
            values: [id]
        };
        const result = await this.executeQuery(query);
        return id;
    }

}