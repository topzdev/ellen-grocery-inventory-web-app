import QueryExtend from '../extends/QueryExtend';
import { Request, Response } from 'express';
import { QueryConfig } from 'pg';
import ICategory from '../interfaces/ICategory';

class CategoryController extends QueryExtend {
	constructor() {
		super();
		console.log('Category Controller');
	}

	public async getCategories(req: Request, res: Response): Promise<any> {

		const { search } = req.query;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.categoryTable}" ${search ? `WHERE category_name ILIKE '%${search}%' ` : ''}`
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Categories Fetched Successfully ',
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

	public async getSingleCategory(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.categoryTable}" WHERE category_id = $1 LIMIT 1`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);
			return res.json({
				message: 'Single Category Successfully Fetched',
				success: true,
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

	public async addCategory(req: Request, res: Response): Promise<any> {
		const { category_name, description }: ICategory = req.body;

		try {
			const query: QueryConfig = {
				text: `INSERT INTO "${this.categoryTable}" (category_name, description) 
				SELECT $1,$2 WHERE NOT EXISTS( SELECT 1 FROM "${this.categoryTable}" 
				WHERE category_name = $3 ) RETURNING category_id`,
				values: [category_name, description, category_name]
			};

			const result = await this.client.query(query);

			if (!result.rowCount) return res.json({
				message: 'Category name has already exist',
				success: false,
			});

			return res.json({
				message: 'Category Successfully Added',
				success: true,
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

	public async updateCategory(req: Request, res: Response): Promise<any> {
		const { category_name, description, category_id }: ICategory = req.body;

		try {
			const query: QueryConfig = {
				text: `UPDATE "${this.categoryTable}" SET category_name = $1, description = $2 
				WHERE category_id = $3 AND NOT EXISTS( SELECT 1 FROM "${this.categoryTable}" WHERE category_name = $4)`,
				values: [category_name, description, category_id, category_name]
			};

			const result = await this.client.query(query);

			console.log(result);

			if (!result.rowCount) return res.json({
				message: 'Category name is already in used',
				success: true,
			});

			return res.json({
				message: 'Category Successfully Updated',
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

	public async deleteCategory(req: Request, res: Response): Promise<any> {
		const category_id = req.params.id;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.categoryTable}" WHERE category_id = $1`,
			values: [category_id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Category Successfully Deleted',
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

export default CategoryController;
