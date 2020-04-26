import { Response, Request } from "express";
import SupplierServices from "../services/SupplierServices";

const supplierServices = new SupplierServices

export default class SupplierController {
	constructor() {
		console.log("Supplier Controller");
	}

	async getSuppliers(req: Request, res: Response) {
		try {
			const result = await supplierServices.getSuppliers(req.query);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({ success: false, message: 'Something went wrong' })
		}
	}

	async getSingleSupplier(req: Request, res: Response) {
		try {
			const result = await supplierServices.getSupplier(parseInt(req.params.id))
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({ success: false, message: 'Something went wrong' })
		}
	}

	async addSupplier(req: Request, res: Response) {
		try {
			const result = await supplierServices.createSupplier(req.body);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({ success: false, message: 'Something went wrong' })
		}
	}

	async updateSupplier(req: Request, res: Response) {
		try {
			const result = await supplierServices.updateSupplier(req.body);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({ success: false, message: error })
		}

	}

	async deleteSupplier(req: Request, res: Response) {
		try {
			const result = await supplierServices.deleteSupplier(parseInt(req.params.id))
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({ success: false, message: 'Something went wrong' })
		}
	}
}

