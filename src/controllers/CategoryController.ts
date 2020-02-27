import QueryExtend from '../extends/QueryExtend';
import { Request, Response } from 'express';
import { QueryConfig } from 'pg';
import { CategoryInterface } from '../interfaces';

class CategoryController extends QueryExtend {
	constructor() {
		super();
		console.log('Category Controller');
	}

	public async getCategories(req: Request, res: Response): Promise<any> {
		const query: QueryConfig = {
			text: `SELECT * FROM "${this.categoryTable}"`
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Categories Successfully Updated ',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async getSingleCategory(req: Request, res: Response): Promise<any> {
		const id = req.body.id;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.categoryTable}" WHERE id = $1 FETCH FIRST 1 ROW ONLY`
		};

		try {
			const result = await this.client.query(query);
			return res.json({
				message: 'Single Category Successfully Fetched',
				success: true,
				data: result.rows[0]
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async addCategory(req: Request, res: Response): Promise<any> {
		const { category_name, description }: CategoryInterface = req.body;

		const query: QueryConfig = {
			text: `INSERT INTO "${this.categoryTable}" (category_name, description) VALUES ($1, $2)`,
			values: [category_name, description]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Category Successfully Added',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async updateCategory(req: Request, res: Response): Promise<any> {
		const { category_name, description, id }: CategoryInterface = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.categoryTable} SET category_name = $1, description = $2 WHERE id = $3"`,
			values: [category_name, description, id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Category Successfully Updated',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async deleteCategory(req: Request, res: Response): Promise<any> {
		const id = req.body.id;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.categoryTable}" WHERE id = $1`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Category Successfully Deleted',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}
}

export default CategoryController;
