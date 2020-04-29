import { Request, Response } from 'express';
import RoleServices from '../services/RoleServices';

const roleServices = new RoleServices;

export default class RoleController {
	constructor() {
		console.log('Role Controller');
	}

	async fetchRoles(req: Request, res: Response): Promise<any> {
		try {
			const result = await roleServices.getMany(req.query);
			return res.json({ success: true, ...result });

		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async fetchSingleRole(req: Request, res: Response): Promise<any> {
		try {
			const result = await roleServices.getOne(parseInt(req.params.id));
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async addRole(req: Request, res: Response): Promise<any> {
		try {
			const result = await roleServices.create(req.body);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async updateRole(req: Request, res: Response): Promise<any> {

		try {
			const result = await roleServices.update(req.body);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async deleteRole(req: Request, res: Response): Promise<any> {
		try {
			const result = await roleServices.delete(parseInt(req.params.id));
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

