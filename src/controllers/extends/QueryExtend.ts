import { Pool } from 'pg';

require('dotenv').config();

class QueryExtend {
	public readonly productTable: string = 'product-info';
	public client: Pool;

	constructor() {
		this.client = new Pool();
	}
}

export default QueryExtend;
