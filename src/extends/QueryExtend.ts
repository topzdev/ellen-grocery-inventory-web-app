import { Pool } from 'pg';

require('dotenv').config();

class QueryExtend {
	protected readonly productTable: string = 'product_table';
	protected readonly brandTable: string = 'brand_table';
	protected readonly supplierTable: string = 'supplier_table';
	protected client: Pool;

	constructor() {
		this.client = new Pool();
	}
}

export default QueryExtend;
