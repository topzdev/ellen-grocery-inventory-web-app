import QueryExtend from "../extends/QueryExtend";
import { IFilter, ICategory } from "../interfaces";
import { QueryConfig } from "pg";

export default class CategoryModel extends QueryExtend {

    async findOne(columns: object, condition?: string): Promise<ICategory> {
        const query: QueryConfig = {
            text: `SELECT * FROM ${this.categoryTable} ${this.analyzeCondition(columns, condition)} limit 1`
        };

        const result = await this.executeQuery(query);
        return result.rows[0]
    }

    async findMany({ search, limit, offset }: IFilter): Promise<ICategory[]> {
        const query: QueryConfig = {
            text: `SELECT * FROM ${this.categoryTable} ${this.analyzeFilter('category_name', { search, limit, offset })}`
        };
        const result = await this.executeQuery(query);
        return result.rows
    }

    async create({ category_name, description }: ICategory): Promise<ICategory['category_id']> {
        const query: QueryConfig = {
            text: `INSERT INTO ${this.categoryTable} (category_name, description) 
            SELECT $1,$2  RETURNING category_id`,
            values: [category_name, description]
        };
        const result = await this.executeQuery(query);
        return result.rows[0].category_id
    }

    async update({ category_id, category_name, description }: ICategory): Promise<ICategory['category_id']> {
        const query: QueryConfig = {
            text: `UPDATE ${this.categoryTable} SET category_name = $1, description = $2 
            WHERE category_id = $3`,
            values: [category_name, description, category_id]
        };
        const result = await this.executeQuery(query);
        return category_id;
    }

    async delete(id: ICategory['category_id']): Promise<ICategory['category_id']> {
        const query: QueryConfig = {
            text: `DELETE FROM ${this.categoryTable} WHERE category_id = $1`,
            values: [id]
        };
        const result = await this.executeQuery(query);
        return id;
    }


}