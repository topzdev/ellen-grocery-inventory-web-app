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
		const { search } = req.query;
		console.log(search)
		const query: QueryConfig = {
			text: `SELECT * FROM "${this.brandTable}" ${search ? `WHERE brand_name ILIKE '%${search}%'` : ''}`
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Supplier Successfully Updated ',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
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
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async addBrand(req: Request, res: Response): Promise<any> {
		const { brand_name }: IBrand = req.body;


		try {
			const query: QueryConfig = {
				text: `INSERT INTO "${this.brandTable}" (brand_name) 
				SELECT $1 WHERE NOT EXISTS (SELECT 1 FROM "${this.brandTable}" 
					WHERE brand_name = $2) RETURNING brand_id`,
				values: [brand_name, brand_name]
			};

			const result = await this.client.query(query);

			if (!result.rowCount) return res.json({
				success: false,
				message: 'Brand name is already exist '
			});

			return res.json({
				success: true,
				message: 'Brand Successfully Added ',
				data: result.rows[0]
			});
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async updateBrand(req: Request, res: Response): Promise<any> {
		const { brand_name, brand_id }: IBrand = req.body;

		try {
			const query: QueryConfig = {
				text: `UPDATE "${this.brandTable}" SET brand_name = $1 WHERE brand_id = $2 
				AND NOT EXISTS(SELECT 1 FROM "${this.brandTable}" WHERE brand_name = $3)`,
				values: [brand_name, brand_id, brand_name]
			};

			const result = await this.client.query(query);

			if (!result.rowCount) return res.json({
				message: 'Brand name is already in used ',
				success: false,
			});

			return res.json({
				message: 'Brand Successfully Updated ',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
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
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}
}

export default BrandController;
