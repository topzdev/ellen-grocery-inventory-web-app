import { Response, Request } from "express";
import QueryExtend from "../extends/QueryExtend";
import ISupplier from "../interfaces/ISupplier";
import { QueryConfig } from "pg";

class SupplierController extends QueryExtend {
	constructor() {
		super();
		console.log("Supplier Controller");
	}

	public async getSuppliers(req: Request, res: Response): Promise<any> {
		
		try {
			
			const query: QueryConfig = {
				text: `SELECT * FROM "${this.supplierTable}"`
			};

			const result = await this.client.query(query);

			return res.json({
				message: "Supplier Successfuly Fetched",
				success: true,
				data: result.rows
			});
		} catch (error) {
			console.error(error.stack);
		}
	}

	public async getSingleSupplier(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		
		try {

			const query: QueryConfig = {
				text: `SELECT * FROM "${this.supplierTable}" WHERE supplier_id = $1`,
				values: [id]
			};

			const result = await this.client.query(query);

			return res.json({
				message: "Supplier Successfully fetched",
				success: true,
				data: result.rows[0]
			});
		} catch (error) {
			console.error(error.stack);
		}
	}

	public async addSupplier(req: Request, res: Response): Promise<any> {
		const {
			supplier_name,
			email_address,
			company_address,
			cp_no,
			tel_no,
			description,
			fax,
			website
		}: ISupplier = req.body;

		try {
			const query: QueryConfig = {
				text: `INSERT INTO "${this.supplierTable}"
				(supplier_name, email_address, company_address, cp_no, tel_no, fax, website, description) 
				VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING supplier_id`,
				values: [
					supplier_name,
					email_address,
					company_address,
					cp_no,
					tel_no,
					fax,
					website,
					description
				]
			};
			const result = await this.client.query(query);

			return res.json({
				message: "Supplier Successfully Added",
				data: result.rows[0],
				success: true
			});
		} catch (error) {
			console.error(error.stack);
		}
	}

	public async updateSupplier(req: Request, res: Response): Promise<any> {
		const {
			supplier_name,
			email_address,
			company_address,
			cp_no,
			tel_no,
			fax,
			website,
			description,
			id
		}: ISupplier = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.supplierTable}" 
			SET supplier_name=$1, email_address=$2, company_address=$3, cp_no = $4, tel_no = $5, fax = $6, website = $7, description = $8 WHERE supplier_id = $9`,
			values: [
				supplier_name,
				email_address,
				company_address,
				cp_no,
				tel_no,
				fax,
				website,
				description,
				id
			]
		};

		try {
			const result = await this.client.query(query);
			console.log(req.body);
			return res.json({
				message: "Supplier Successfully Updated ",
				success: true,
				data: result.rows
			});
		} catch (error) {
			console.error(error.stack);
		}

		return;
	}

	public async deleteSupplier(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		try {

			const query: QueryConfig = {
				text: `DELETE FROM "${this.supplierTable}" WHERE supplier_id = $1`,
				values: [id]
			};
			
			const result = await this.client.query(query);

			return res.json({
				message: "Supplier Successfully Deleted",
				success: true,
				data: result.rows
			});
		} catch (error) {
			console.error(error.stack);
		}
	}
}

export default SupplierController;
