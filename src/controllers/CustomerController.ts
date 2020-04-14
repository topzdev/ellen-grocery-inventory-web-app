import QueryExtend from '../extends/QueryExtend';
import { QueryConfig } from 'pg';
import { Response, Request } from 'express';
import ICustomer from '../interfaces/ICustomer';

class CustomerController extends QueryExtend {
	constructor() {
		super();
		console.log('Customer Controller');
	}

	public async fetchCustomers(req: Request, res: Response): Promise<any> {
		const { search, limit, offset } = req.query;

		const query: QueryConfig = {
			text: `SELECT 
				customer_id,
				firstname ||' '|| lastname AS fullname,
				home_address,
				email_address
			FROM "${this.customerTable}" 
			${this.queryAnalyzer("firstname ||' '|| lastname", search, limit, offset)} `
		};

		console.log(req.query, query);
		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Customers Successfully Fetched',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async fetchSingleCustomer(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.customerTable}" WHERE customer_id = $1 FETCH FIRST 1 ROW ONLY`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Customer Successfully Fetched',
				success: true,
				data: result.rows[0]
			});
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async addCustomer(req: Request, res: Response): Promise<any> {
		const {
			firstname,
			lastname,
			email_address,
			home_address,
			cp_no,
			tel_no,
		}: ICustomer = req.body;

		try {

			const query: QueryConfig = {
				text: `INSERT INTO "${this.customerTable}" (firstname,lastname,home_address, 
					email_address, cp_no, tel_no) VALUES ($1,$2,$3,$4,$5,$6) RETURNING customer_id`,
				values: [
					firstname,
					lastname,
					home_address,
					email_address,
					cp_no,
					tel_no,
				]
			};
			const result = await this.client.query(query);

			return res.json({
				message: 'Customer Successfully Added',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async updateCustomer(req: Request, res: Response): Promise<any> {
		const {
			customer_id,
			firstname,
			lastname,
			home_address,
			email_address,
			cp_no,
			tel_no,
			points,
		}: ICustomer = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.customerTable}" SET(firstname = $1, lastname = $2, middlename = $3, 
                 cp_no = $4, tel_no = $5, home_address = $6) WHERE customer_id = $7`,
			values: [
				firstname,
				lastname,
				email_address,
				cp_no,
				tel_no,
				home_address,
				customer_id
			]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Customers Successfully Updated',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}

	public async deleteCustomer(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.customerTable}" WHERE customer_id = $1`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Customers Successfully Deleted',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return res.json({
				success: false,
				message: 'Something went wrong, Please try again later ',
				data: error.stack
			});
		}
	}
}

export default CustomerController;
