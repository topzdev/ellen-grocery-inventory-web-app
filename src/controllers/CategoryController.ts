import { Request, Response } from 'express';
import CategoryServices from '../services/CategoryServices';

const categoryServices = new CategoryServices;

export default class CategoryController {
	constructor() {
		console.log('Category Controller');
	}

	public async getCategories(req: Request, res: Response): Promise<any> {
		try {
			const result = await categoryServices.getMany(req.query)
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async getSingleCategory(req: Request, res: Response): Promise<any> {
		try {
			const result = await categoryServices.getOne(parseInt(req.params.id))
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async addCategory(req: Request, res: Response): Promise<any> {
		try {
			const result = await categoryServices.create(req.body)
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async updateCategory(req: Request, res: Response): Promise<any> {
		try {
			const result = await categoryServices.update(req.body)
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async deleteCategory(req: Request, res: Response): Promise<any> {
		try {
			const result = await categoryServices.delete(parseInt(req.params.id))
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}
}
