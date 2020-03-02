import { QueryConfig } from 'pg';
import { Request, Response } from 'express';
import QueryExtends from '../extends/QueryExtend';
import IStaff from '../interfaces/StaffInterfaces';

class StaffController extends QueryExtends {
	constructor() {
		super();
		console.log('Staff Controller');
	}

	public async fetchStaffs(req: Request, res: Response): Promise<any> {
		const query: QueryConfig = {
			text: `SELECT * FROM "${this.staffTable}"`
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Staffs Successfully Fetched',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async fetchSingleStaff(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.staffTable} WHERE staff_id = $1 FETCH FIRST 1 ONLY ROW"`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Staff Successfully Fetched',
				success: true,
				data: result.rows[0]
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async addStaff(req: Request, res: Response): Promise<any> {
		const {
			firstname,
			lastname,
			middlename,
			username,
			email_address,
			role_id
		}: IStaff = req.body;

		const query: QueryConfig = {
			text: `INSERT INTO "${this.staffTable}" (firstname,
                lastname,  middlename, username,  email_address, role_id)
                VALUES ($1, $2, $3, $4, $5, $6)`,
			values: [
				firstname,
				lastname,
				middlename,
				username,
				email_address,
				role_id
			]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Staff Successfully Added',
				success: true,
				data: result.rows
			});
		} catch (error) {
			console.error(error);
		}
	}

	public async updateStaff(req: Request, res: Response): Promise<any> {
		const {
			staff_id,
			firstname,
			lastname,
			middlename,
			username,
			email_address,
			role_id
		}: IStaff = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.staffTable}" SET firstname = $1,
                lastname = $2, middlename = $3, username = $4, email_address = $5, role_id = $6 WHERE staff_id = $7`,
			values: [
				firstname,
				lastname,
				middlename,
				username,
				email_address,
				role_id,
				staff_id
			]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Staff Successfully Updated',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error);
		}
	}

	public async deleteStaff(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.staffTable}" WHERE staff_id = $1`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Staff Successfully Updated',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}
}

export default StaffController;
