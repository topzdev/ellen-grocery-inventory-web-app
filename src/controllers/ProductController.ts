import { Response, Request } from 'express';
import QueryExtend from '../extends/QueryExtend';
import { ProductInterface } from '../interfaces';
import { QueryConfig } from 'pg';

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
				data: result.rows
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
			price,
			description,
			brand,
			supplier_name,
			category,
			image
		}: ProductInterface = req.body;

		const query: QueryConfig = {
			text: `INSERT INTO "${this.productTable}" 
			(barcode, product_name, quantity, price, description, brand, supplier_name, category, image)
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
			values: [
				barcode,
				product_name,
				quantity,
				price,
				description,
				brand,
				supplier_name,
				category,
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
			price,
			description,
			brand,
			supplier_name,
			category,
			image
		}: ProductInterface = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.productTable}" SET 
			barcode=$1, product_name=$2, 
			quantity=$3, price=$4, description=$5, 
			brand=$6, supplier_name=$7, category=$8, image=$9 
			WHERE barcode = $1`,
			values: [
				barcode,
				product_name,
				quantity,
				price,
				description,
				brand,
				supplier_name,
				category,
				image
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
		const barcode = req.params.barcode;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.productTable}" WHERE barcode = $1`,
			values: [barcode]
		};

		try {
			const result = await this.client.query(query);
			console.log(result);
			return res.json({
				message: 'Successfully Deleted',
				data: result.rows
			});
		} catch (err) {
			console.log('Database error', err.stack);
		}
	}
}

export default ProductController;
