import QueryExtend from "../extends/QueryExtend";
import IProduct from "../interfaces/IProduct";
import IFilter from "../interfaces/IFilter";
import { QueryConfig } from "pg";


export default class ProductModel extends QueryExtend {

    async findOne(barcode: string) {
        const query: QueryConfig = {
            text: `SELECT * FROM ${this.productTable} WHERE barcode = $1`,
            values: [barcode]
        };

        const result = await this.executeQuery(query);
        return result.rows[0];
    }

    async findMany({ search, limit, offset }: IFilter): Promise<IProduct[]> {
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
            FROM "${this.productTable}" product
            INNER JOIN "${this.brandTable}" brand ON product.brand_id = brand.brand_id 
            INNER JOIN "${this.categoryTable}" category ON product.category_id = category.category_id 
            INNER JOIN "${this.supplierTable}" supplier ON product.supplier_id = supplier.supplier_id
            ${this.queryAnalyzer("product.product_name", { search, limit, offset })}`,

        };

        const result = await this.executeQuery(query);
        return result.rows
    }

    async create({ barcode, product_name, quantity, quantity_max, quantity_min, price, description, brand_id, supplier_id, category_id, image_id, image_url }: IProduct) {
        const query: QueryConfig = {
            text: `INSERT INTO "${this.productTable}" 
            (barcode, product_name, quantity, quantity_max, quantity_min, price, description, 
            brand_id, supplier_id, category_id, image_id, image_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
            RETURNING product_id`,
            values: [
                barcode,
                product_name,
                quantity,
                quantity_max,
                quantity_min,
                price,
                description,
                brand_id,
                supplier_id,
                category_id,
                image_id,
                image_url
            ]
        }

        const result = await this.executeQuery(query);

        return result.rows[0].product_id
    }

    async update(id: IProduct['product_id'], { barcode, product_name, quantity, quantity_max, quantity_min, price, description, brand_id, supplier_id, category_id, image_id, image_url }: IProduct) {
        const query: QueryConfig = {
            text: `UPDATE "${this.productTable}" SET 
                        barcode=$1, product_name=$2, quantity=$3, quantity_max=$4, quantity_min=$5, price=$6, 
                        description=$7, brand_id=$8, supplier_id=$9, category_id=$10, image_id=$11, image_url=$12 WHERE product_id=$13`,
            values: [
                barcode,
                product_name,
                quantity,
                quantity_max,
                quantity_min,
                price,
                description,
                brand_id,
                supplier_id,
                category_id,
                image_id,
                image_url,
                id
            ]
        };

        await this.executeQuery(query);

        return id;
    }

    async delete(id: IProduct['product_id']) {
        const query: QueryConfig = {
            text: `DELETE FROM "${this.productTable}" WHERE product_id = $1`,
            values: [id]
        };

        return id;
    }

}