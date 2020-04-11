import { QueryConfig } from 'pg';
import { Request, Response } from 'express';
import QueryExtends from '../extends/QueryExtend';
import IAccount from '../interfaces/IAccount';
import bcrypt from 'bcryptjs';
require('dotenv').config();

class AccountController extends QueryExtends {
	constructor() {
		super();
		console.log('Account Controller');
	}

	public async fetchAccounts(req: Request, res: Response): Promise<any> {
		const { search, limit, offset } = req.query;

		const query: QueryConfig = {
			text: `SELECT
			account.account_id,
			account.firstname || ' ' || account.lastname AS fullname,
			account.username,
			role.role_name
			FROM "${this.accountTable}" account INNER JOIN "${this.roleTable}" role ON role.role_id = account.role_id
			${search ? `WHERE account_name ILIKE '%${search}%'` : ''}`
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Accounts Successfully Fetched',
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

	public async fetchSingleAccount(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `SELECT 
			account_id,
			firstname,
			lastname,
			middlename,
			username, 
			email_address,
			role_id
			FROM "${this.accountTable}" WHERE account_id = $1 FETCH FIRST 1 ROW ONLY`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Account Successfully Fetched',
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

	public async addAccount(req: Request, res: Response): Promise<any> {
		const {
			firstname,
			lastname,
			middlename,
			username,
			email_address,
			role_id,
			password
		}: IAccount = req.body;

		let hashPassword = await bcrypt.hash(password, 10);


		try {
			let query: QueryConfig = {
				text: `SELECT account_id FROM "${this.accountTable}" WHERE username = $1`,
				values: [username]
			}

			let result = await this.client.query(query);

			if (result.rows.length) return res.json({
				success: false,
				message: 'Username Already Exist',
			});

			query = {
				text: `INSERT INTO "${this.accountTable}" (firstname,
					lastname,  middlename, username,  email_address, role_id, password)
					VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING account_id`,
				values: [
					firstname,
					lastname,
					middlename,
					username,
					email_address,
					role_id,
					hashPassword
				]
			};



			result = await this.client.query(query);

			return res.json({
				message: 'Account Successfully Added',
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

	public async updateAccount(req: Request, res: Response): Promise<any> {
		const {
			account_id,
			firstname,
			lastname,
			middlename,
			username,
			email_address,
			role_id
		}: IAccount = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.accountTable}" SET firstname = $1,
                lastname = $2, middlename = $3, username = $4, email_address = $5, role_id = $6 WHERE account_id = $7`,
			values: [
				firstname,
				lastname,
				middlename,
				username,
				email_address,
				role_id,
				account_id
			]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Account Successfully Updated',
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

	public async deleteAccount(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.accountTable}" WHERE account_id = $1`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Account Successfully Deleted',
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

export default AccountController;
