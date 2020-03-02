import { Response, Request } from 'express';
import QueryExtend from '../extends/QueryExtend';
import { ProductInterface } from '../interfaces';
import { QueryConfig } from 'pg';
import { ResultFactory } from 'express-validator';

class ProductController extends QueryExtend {
	constructor() {
		super();
		console.log('Product Controller');
	}

	public async getSingleProduct(req: Request, res: Response): Promise<any> {
		const barcode = req.params.barcode;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.productTable}" WHERE barcode = $1`,
			values: [barcode]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				success: true,
				message: 'Successfly Single Product Fetch',
				data: result.rows[0]
			});
		} catch (err) {
			console.log('Database error', err.stack);
		}
	}

	public async getProducts(req: Request, res: Response): Promise<any> {
		const query: QueryConfig = {
			text: `SELECT * FROM "${this.productTable}"`
		};

		try {
			const result = await this.client.query(query);
			return res.json({
				success: true,
				message: 'Successfully fetched',
				data: result.rows
			});
		} catch (err) {
			console.log('Database error', err.stack);
		}
	}

	public async addProduct(req: Request, res: Response): Promise<any> {
		const {
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
			image
		}: ProductInterface = req.body;

		const query: QueryConfig = {
			text: `INSERT INTO "${this.productTable}" 
			(barcode, product_name, quantity, quantity_max, quantity_min, price, description, brand_id, supplier_id, category_id, image)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
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
				image
			]
		};
		console.log(req.body);
		try {
			const result = await this.client.query(query);

			return res.json({
				success: true,
				message: 'Product Successfully Added',
				data: result.rows
			});
		} catch (err) {
			console.log(req.body);
			console.log('Database error', err.stack);
		}
	}

	public async updateProduct(req: Request, res: Response): Promise<any> {
		const {
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
			image,
			product_id
		}: ProductInterface = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.productTable}" SET 
			barcode=$1, product_name=$2, quantity=$3, quantity_max=%4, quantity_min=$5, price=$5, description=$6, brand_id=$7, supplier_id=$8, category_id=$9, image=$10 WHERE product_id=$11`,
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
				image,
				product_id
			]
		};

		try {
			const result = await this.client.query(query);
			console.log('Process');
			res.json({
				success: true,
				message: 'Product Successfuly Updated',
				data: result
			});
		} catch (err) {
			console.error(err.stack);
		}
	}

	public async deleteProduct(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.productTable}" WHERE product_id = $1`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);
			console.log(result);
			return res.json({
				success: true,
				message: 'Successfully Deleted',
				data: result.rows
			});
		} catch (err) {
			console.log('Database error', err.stack);
		}
	}

	public async productSearch(req: Request, res: Response): Promise<any> {
		const search = req.body.searchString;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.productTable}" WHERE barcode LIKE $1`,
			values: ['%' + search + '%']
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Product Successfully Searched',
				data: result.rows
			});
		} catch (err) {
			console.log('Database error', err.stack);
		}
	}
}

export default ProductController;
