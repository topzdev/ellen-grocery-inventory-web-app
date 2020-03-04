import QueryExtend from '../extends/QueryExtend';
import { QueryConfig } from 'pg';
import { Request, Response } from 'express';
import IBrand from '../interfaces/IBrand';

class BrandController extends QueryExtend {
	constructor() {
		super();
		console.log('Brand Controller');
	}

	public async getBrands(req: Request, res: Response): Promise<any> {
		const query: QueryConfig = {
			text: `SELECT * FROM "${this.brandTable}"`
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Supplier Successfully Updated ',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async getSingleBrand(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.brandTable}" WHERE brand_id = $1 FETCH FIRST 1 ROW ONLY`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Fetched Single Brand Successfully ',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error);
		}
	}

	public async addBrand(req: Request, res: Response): Promise<any> {
		const { brand_name }: IBrand = req.body;

		const query: QueryConfig = {
			text: `INSERT INTO "${this.brandTable}" (brand_name) VALUES ($1)`,
			values: [brand_name]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Brand Successfully Added ',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error);
		}
	}

	public async updateBrand(req: Request, res: Response): Promise<any> {
		const { brand_name, brand_id }: IBrand = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.brandTable}" SET brand_name = $1 WHERE brand_id = $2`,
			values: [brand_name, brand_id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Brand Successfully Updated ',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error);
		}
	}

	public async deleteBrand(req: Request, res: Response): Promise<any> {
		const brand_id = req.params.id;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.brandTable}" WHERE brand_id = $1`,
			values: [brand_id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Brand Successfully Deleted ',
				success: true,
				data: result.rows
			});
		} catch (error) {
			console.error(error);
		}
	}
}

export default BrandController;
