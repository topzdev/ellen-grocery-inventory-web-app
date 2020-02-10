import { Response, Request } from 'express';
import QueryExtend from '../extends/QueryExtend';
import { SupplierInterface } from '../interfaces';
import { QueryConfig } from 'pg';

class SupplierController extends QueryExtend {
	constructor() {
		super();
		console.log('Supplier Controller');
	}

	public async getSuppliers(req: Request, res: Response): Promise<any> {
		const query: QueryConfig = {
			text: `SELECT * FROM "${this.supplierTable}"`
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Supplier Successfuly Fetched',
				data: result.rows
			});
		} catch (error) {
			console.error(error.stack);
		}
	}

	public async getSingleSupplier(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.supplierTable}" WHERE id = $1`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Supplier Successfully fetched',
				data: result.rows
			});
		} catch (error) {
			console.error(error.stack);
		}
	}

	public async addSupplier(req: Request, res: Response): Promise<any> {
		const {
			supplier_name,
			email,
			address,
			cp_no,
			tel_no
		}: SupplierInterface = req.body;

		const query: QueryConfig = {
			text: `INSERT INTO "${this.supplierTable}"
			(supplier_name, email, address, cp_no, tel_no) 
			VALUES ($1, $2, $3, $4, $5)`,
			values: [supplier_name, email, address, cp_no, tel_no]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Supplier Successfully Added',
				data: result.rows
			});
		} catch (error) {
			console.error(error.stack);
		}
	}

	public async updateSupplier(req: Request, res: Response): Promise<any> {
		const {
			supplier_name,
			email,
			address,
			cp_no,
			tel_no,
			id
		}: SupplierInterface = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.supplierTable}" 
			SET supplier_name=$1, email=$2, address=$3, cp_no=$4, tel_no=$5 
			WHERE id = $6`,
			values: [supplier_name, email, address, cp_no, tel_no, id]
		};

		try {
			const result = await this.client.query(query);
			console.log(req.body);
			return res.json({
				message: 'Supplier Successfully Updated ',
				data: result.rows
			});
		} catch (error) {
			console.error(error.stack);
		}

		return;
	}

	public async deleteSupplier(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.supplierTable}" WHERE id = $1`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Supplier Successfully Deleted',
				data: result.rows
			});
		} catch (error) {
			console.error(error.stack);
		}
	}
}

export default SupplierController;
