import { Pool } from 'pg';

require('dotenv').config();

class QueryExtend {
	protected readonly productTable: string = 'product_table';
	protected readonly brandTable: string = 'brand_table';
	protected readonly supplierTable: string = 'supplier_table';
	protected readonly categoryTable: string = 'category_table';
	protected readonly customerTable: string = 'customer_table';
	protected readonly staffTable: string = 'staff_table';
	protected readonly roleTable: string = 'role_table';

	protected client: Pool;

	constructor() {
		this.client = new Pool();
	}
}

export default QueryExtend;
