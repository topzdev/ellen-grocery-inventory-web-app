import { Request, Response } from 'express';
import BrandServices from '../services/BrandServices';

const brandServices = new BrandServices;

export default class BrandController {
	constructor() {
		console.log('Brand Controller');
	}

	public async getBrands(req: Request, res: Response) {
		try {
			const result = await brandServices.getMany(req.query);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async getSingleBrand(req: Request, res: Response) {
		try {
			const result = await brandServices.getOne(parseInt(req.params.id))
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async addBrand(req: Request, res: Response) {
		try {
			const result = await brandServices.create(req.body)
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async updateBrand(req: Request, res: Response) {
		try {
			const result = await brandServices.update(req.body)
			console.log(result)
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async deleteBrand(req: Request, res: Response) {
		try {
			const result = await brandServices.delete(parseInt(req.params.id))
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}
}

