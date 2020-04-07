import { Pool } from 'pg';

require('dotenv').config();

class QueryExtend {
	protected readonly productTable: string = 'product_table';
	protected readonly brandTable: string = 'brand_table';
	protected readonly supplierTable: string = 'supplier_table';
	protected readonly categoryTable: string = 'category_table';
	protected readonly customerTable: string = 'customer_table';
	protected readonly accountTable: string = 'account_table';
	protected readonly roleTable: string = 'role_table';

	protected client: Pool;

	constructor() {
		this.client = new Pool();
	}

	public queryAnalyzer(searchString: string, search?: string, limit?: string, offset?: string) {
		let query = '';
		if (search && searchString) query += `WHERE ${searchString} ILIKE '%${search}%'`
		if (limit) {
			query += `LIMIT ${limit} `
			if (offset) query += `OFFSET ${offset}`
		}
		return query;
	}
}

export default QueryExtend;
