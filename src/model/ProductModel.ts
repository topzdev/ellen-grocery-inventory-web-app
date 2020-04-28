import QueryExtend from "../extends/QueryExtend";
import IProduct from "../interfaces/IProduct";
import IFilter from "../interfaces/IFilter";
import { QueryConfig } from "pg";


export default class ProductModel extends QueryExtend {


    async findOne(columns: object, condition?: string, include?: object): Promise<IProduct> {
        const query: QueryConfig = {
            text: `SELECT ${this.queryColumns(include!)} FROM ${this.productTable} ${this.analyzeCondition(columns, condition)}`,
        };
        const result = await this.executeQuery(query);
        return result.rows[0];
    }

    async findMany({ search, limit, offset, show_deleted }: IFilter): Promise<IProduct[]> {
        const query: QueryConfig = {
            text: `SELECT
            product.product_id,
            product.barcode,
            product.product_name,
            product.quantity,
            product.quantity_max,
            product.quantity_min,
            product.price,
            product.description,
            product.brand_id,
            product.supplier_id,
            product.category_id,
            product.image_id,
            product.image_url,
            brand.brand_name,
            category.category_name,
            supplier.supplier_name
            FROM ${this.productTable} product
            INNER JOIN "${this.brandTable}" brand ON product.brand_id = brand.brand_id 
            INNER JOIN "${this.categoryTable}" category ON product.category_id = category.category_id 
            INNER JOIN "${this.supplierTable}" supplier ON product.supplier_id = supplier.supplier_id
            ${this.analyzeFilter("product.product_name", { search, limit, offset, show_deleted })}`,

        };

        const result = await this.executeQuery(query);
        return result.rows
    }

    async create(product: IProduct) {
        const query: QueryConfig = {
            text: `INSERT INTO ${this.productTable} ${this.queryfields(product, 'insert')}
            RETURNING product_id`
        }
        const result = await this.executeQuery(query);
        return result.rows[0].product_id
    }

    async update(id: IProduct['product_id'], product: IProduct) {
        const query: QueryConfig = {
            text: `UPDATE ${this.productTable} ${this.queryfields(product, 'update')} WHERE product_id=$1`,
            values: [id]
        };
        await this.executeQuery(query);
        return id;
    }

    async remove(id: IProduct['product_id']) {
        const query: QueryConfig = {
            text: `UPDATE ${this.productTable} SET is_deleted = TRUE WHERE product_id = $1`,
            values: [id]
        };
        await this.executeQuery(query);
        return id;
    }

    async delete(id: IProduct['product_id']) {
        const query: QueryConfig = {
            text: `DELETE FROM ${this.productTable} WHERE product_id = $1`,
            values: [id]
        };
        await this.executeQuery(query);
        return id;
    }
}