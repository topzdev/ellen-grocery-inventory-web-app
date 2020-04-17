import { QueryConfig } from 'pg';
import { Request, Response } from 'express';
import QueryExtends from '../extends/QueryExtend';
import IAccount from '../interfaces/IAccount';
import bcrypt from 'bcryptjs';
import { query } from 'express-validator';
require('dotenv').config();

class AccountController extends QueryExtends {
	constructor() {
		super();
		console.log('Account Controller');
	}

	public async fetchAccounts(req: Request, res: Response) {
		const { search, limit, offset } = req.query;

		const query: QueryConfig = {
			text: `SELECT
			account.account_id,
			account.firstname || ' ' || account.lastname AS fullname,
			account.username,
			role.role_name
			FROM "${this.accountTable}" account INNER JOIN "${this.roleTable}" role ON role.role_id = account.role_id
			${search ? `WHERE account.firstname || ' ' || account.lastname ILIKE '%${search}%'` : ''}`
		};

		try {
			const result = await this.executeQuery(query);

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

	public async fetchSingleAccount(req: Request, res: Response) {
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
			const result = await this.executeQuery(query);

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

	public async addAccount(req: Request, res: Response) {
		const {
			firstname,
			lastname,
			middlename,
			username,
			email_address,
			role_id,
			password
		}: IAccount = req.body;

		try {
			let hashPassword = await bcrypt.hash(password, 10);

			const query: QueryConfig = {
				text: `INSERT INTO "${this.accountTable}" (firstname,
					lastname,  middlename, username,  email_address, role_id, password)
					SELECT $1, $2, $3, $4, $5, $6, $7 WHERE NOT EXISTS (SELECT 1 FROM "${this.accountTable}" WHERE username = $8 ) RETURNING account_id`,
				values: [
					firstname,
					lastname,
					middlename,
					username,
					email_address,
					role_id,
					hashPassword,
					username
				]
			};

			const result = await this.executeQuery(query);

			console.log(result)

			if (!result.rowCount) return res.json({
				success: false,
				message: 'Username Already Exist',
			});

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

	public async updateAccount(req: Request, res: Response) {
		const {
			account_id,
			firstname,
			lastname,
			middlename,
			username,
			email_address,
			role_id
		}: IAccount = req.body;

		try {
			const query: QueryConfig = {
				text: `UPDATE "${this.accountTable}"
				 	SET firstname = $1, lastname = $2, middlename = $3, username = $4, email_address = $5, role_id = $6 
					WHERE account_id = $7 AND NOT EXISTS(SELECT 1 FROM "${this.accountTable}" WHERE username = $8)`,
				values: [
					firstname,
					lastname,
					middlename,
					username,
					email_address,
					role_id,
					account_id,
					username
				]
			};

			const result = await this.executeQuery(query);

			console.log(result, query);

			if (!result.rowCount) return res.json({
				message: 'Username is already in used ',
				success: false,
			});

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


	public async updateAccountPassword(req: Request, res: Response) {
		const { account_id, current_password, new_password } = req.body;
		try {
			let query: QueryConfig = {
				text: `SELECT password from "${this.accountTable}" WHERE account_id = $1`,
				values: [account_id]
			}

			let result = await this.executeQuery(query);

			// Check if account_id provided is exisiting in database
			if (!result.rowCount) return res.json({
				message: 'Account not found',
				success: false,
			});

			// Check if current password match the old password
			if (!await bcrypt.compare(current_password, result.rows[0].password)) return res.json({
				message: 'Current Password not match',
				success: false,
			});

			// Check if new password is not identical to old password 
			if (await bcrypt.compare(new_password, result.rows[0].password)) return res.json({
				message: 'You cannot use the previous password',
				success: false,
			});

			// After a bunch of validations hash the new password
			let hashedPassword = await bcrypt.hash(new_password, 10);

			query = {
				text: `UPDATE "${this.accountTable}" SET password = $1`,
				values: [hashedPassword]
			}

			result = await this.executeQuery(query);

			return res.json({
				message: 'Password Successfully Updated',
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

	public async deleteAccount(req: Request, res: Response) {
		const id = req.params.id;

		try {
			const query: QueryConfig = {
				text: `DELETE FROM "${this.accountTable}" WHERE account_id = $1`,
				values: [id]
			};

			const result = await this.executeQuery(query);

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
