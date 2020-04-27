import { Request, Response } from 'express';
import { QueryConfig } from 'pg';
import QueryExtend from '../extends/QueryExtend';
import IRole from '../interfaces/IRole';
import RoleServices from '../services/RoleServices';

const roleServices = new RoleServices;

class RoleController {
	constructor() {
		console.log('Role Controller');
	}

	public async fetchRoles(req: Request, res: Response): Promise<any> {
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

	public async fetchSingleRole(req: Request, res: Response): Promise<any> {
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

	public async addRole(req: Request, res: Response): Promise<any> {
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

	public async updateRole(req: Request, res: Response): Promise<any> {

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

	public async deleteRole(req: Request, res: Response): Promise<any> {
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

export default RoleController;
