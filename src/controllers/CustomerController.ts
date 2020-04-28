import { Response, Request } from 'express';
import CustomerServices from '../services/CustomerServices';

const customerServices = new CustomerServices

export default class CustomerController {
	constructor() {
		console.log('Customer Controller');
	}

	async fetchCustomers(req: Request, res: Response): Promise<any> {
		try {
			const result = await customerServices.getMany(req.query);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async fetchSingleCustomer(req: Request, res: Response): Promise<any> {
		try {
			const result = await customerServices.getOne(parseInt(req.params.id));
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async addCustomer(req: Request, res: Response): Promise<any> {
		try {
			const result = await customerServices.create(req.body);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async updateCustomer(req: Request, res: Response): Promise<any> {
		try {
			const result = await customerServices.update(req.body);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async deleteCustomer(req: Request, res: Response): Promise<any> {
		try {
			const result = await customerServices.delete(parseInt(req.params.id));
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	async removeCustomer(req: Request, res: Response): Promise<any> {
		try {
			const result = await customerServices.remove(parseInt(req.params.id));
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
