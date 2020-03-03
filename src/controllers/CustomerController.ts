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
		const query: QueryConfig = {
			text: `SELECT * FROM "${this.customerTable}"`
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Customers Successfully Fetched',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.log(error.stack);
		}
	}

	public async fetchSingleCustomer( req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.customerTable}" WHERE customer_id = $1 FETCH FIRST 1 ONLY ROW`,
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
			return console.error(error);
		}
	}

	public async addCustomer(req: Request, res: Response): Promise<any> {
		const {
			firstname,
			lastname,
			middlename,
			email_address,
			cp_no,
			tel_no,
			points,
			fax
		}: ICustomer = req.body;

		const query: QueryConfig = {
			text: `INSERT INTO "${this.customerTable}" (firstname, lastname, middlename, 
                email_address, cp_no, tel_no, points, fax) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
			values: [
				firstname,
				lastname,
				middlename,
				email_address,
				cp_no,
				tel_no,
				points,
				fax
			]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Customer Successfully Added',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error);
		}
	}

	public async updateCustomer(req: Request, res: Response): Promise<any> {
		const {
			customer_id,
			firstname,
			lastname,
			middlename,
			email_address,
			cp_no,
			tel_no,
			points,
			fax
		}: ICustomer = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.customerTable}" SET(firstname = $1, lastname = $2, middlename = $3, 
                email_address = $4, cp_no = $5, tel_no = $6, points = $7, fax = $8) WHERE customer_id = $9`,
			values: [
				firstname,
				lastname,
				middlename,
				email_address,
				cp_no,
				tel_no,
				points,
				fax,
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
			return console.error(error);
		}
	}

	public async deleteCustomer(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `DELETE INTO "${this.customerTable} WHERE customer_id = $1"`,
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
			return console.error(error);
		}
	}
}

export default CustomerController;
