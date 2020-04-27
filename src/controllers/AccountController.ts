import { Request, Response } from 'express';
import AccountServices from '../services/AccountServicies';

const accountServices = new AccountServices;

export default class AccountController {
	constructor() {
		console.log('Account Controller');
	}

	async fetchAccounts(req: Request, res: Response) {

		try {
			const result = await accountServices.getMany(req.query)
			return res.json({ success: true, ...result });

		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async fetchSingleAccount(req: Request, res: Response) {
		try {
			const result = await accountServices.getOne(parseInt(req.params.id))
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async addAccount(req: Request, res: Response) {
		try {
			const result = await accountServices.create(req.body)
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async updateAccount(req: Request, res: Response) {
		try {
			const result = await accountServices.update(req.body)
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}


	async updateAccountPassword(req: Request, res: Response) {
		try {
			const result = await accountServices.updatePassword(req.body)
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async deleteAccount(req: Request, res: Response) {
		try {
			const result = await accountServices.delete(parseInt(req.params.id))
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async removeAccount(req: Request, res: Response) {
		try {
			const result = await accountServices.remove(parseInt(req.params.id))
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


