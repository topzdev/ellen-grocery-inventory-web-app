import { Request, Response } from 'express';
import { QueryConfig } from 'pg';
import QueryExtend from '../extends/QueryExtend';
import IRole from '../interfaces/RoleInterfaces';

class RoleController extends QueryExtend {
	constructor() {
		super();
		console.log('Role Controller');
	}

	public async fetchRoles(req: Request, res: Response): Promise<any> {
		const query: QueryConfig = {
			text: `SELECT * FROM "${this.roleTable}"`
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Roles Successfully Fetched',
				success: true,
				data: result.rows
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async fetchSingleRole(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `SELECT * FROM "${this.roleTable} WHERE role_id = $1 FETCH FIRST 1 ONLY ROW"`,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Role Successfully Fetched',
				success: true,
				data: result.rows[0]
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async addRole(req: Request, res: Response): Promise<any> {
		const role_name: IRole = req.body.role_name;

		const query: QueryConfig = {
			text: `INSERT INTO "${this.roleTable}" (role_name) VALUES ($1)`,
			values: [role_name]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Role Successfully Added',
				success: true,
				data: result.rows[0]
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async updateRole(req: Request, res: Response): Promise<any> {
		const { role_id, role_name }: IRole = req.body;

		const query: QueryConfig = {
			text: `UPDATE "${this.roleTable}" SET role_name = $1 WHERE role_id = $2`,
			values: [role_name, role_id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Role Successfully Updated',
				success: true,
				data: result.rows[0]
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}

	public async deleteRole(req: Request, res: Response): Promise<any> {
		const id = req.params.id;

		const query: QueryConfig = {
			text: `DELETE FROM "${this.roleTable}" WHERE role_id = $1 `,
			values: [id]
		};

		try {
			const result = await this.client.query(query);

			return res.json({
				message: 'Role Successfully Deleted',
				success: true,
				data: result.rows[0]
			});
		} catch (error) {
			return console.error(error.stack);
		}
	}
}

export default RoleController;
