import { Pool, QueryConfig } from 'pg';
import config from '../config'
import IFilter from '../interfaces/IFilter';
class QueryExtend {
	protected readonly productTable: string = 'product_table';
	protected readonly brandTable: string = 'brand_table';
	protected readonly supplierTable: string = 'supplier_table';
	protected readonly categoryTable: string = 'category_table';
	protected readonly customerTable: string = 'customer_table';
	protected readonly accountTable: string = 'account_table';
	protected readonly roleTable: string = 'role_table';
	protected readonly transactionTable: string = 'transaction_table';

	protected pool: Pool;

	constructor() {
		this.pool = new Pool;
	}

	queryColumns(include: object, table?: string) {
		let columns = [];
		for (const key in include) {
			// @ts-ignore
			if (include[key] === true) {
				if (table) columns.push(`${table}.${key}`);
				else columns.push(key)
			}
		}
		return columns.length ? columns.join(',') : '*'
	}

	queryfields(columns: object, format: string) {
		if (format === 'update') {
			let fields = [];
			for (const key in columns) {
				// @ts-ignore
				fields.push(`${key}='${columns[key]}'`)
			}
			return `set ${fields.join(',')}`
		} else if (format === 'insert') {
			let values = [];
			for (const key in columns) {
				// @ts-ignore
				values.push(`'${columns[key]}'`)
			}
			return `(${Object.keys(columns)}) values (${values.join(',')})`
		}

		throw Error('Missing some parameters for method queryfields(columns: object, format: string)')
	}


	analyzeCondition(columns: object, condition?: string) {
		let string = [];

		for (const key in columns) {
			// @ts-ignore
			string.push(`${key} = '${columns[key]}'`)
		}

		if (!string.length) return ''

		return ' where ' + string.join(` ${condition} `);
	}

	async executeQuery(query: QueryConfig) {
		const client = new Pool(config.database);
		try {
			const result = await client.query(query)
			return result;
		} catch (error) {
			console.log('Database error', error.stack);
			throw error;
		} finally {
			await client.end();
		}
	}

	analyzeFilter(column: string, { offset, limit, search }: IFilter) {
		let query = '';
		if (search && column) query += `WHERE ${column} ILIKE '%${search}%'`
		if (limit) {
			query += `LIMIT ${limit} `
			if (offset) query += `OFFSET ${offset}`
		}
		return query;
	}

	timespanCondition(timespan: string, column: string) {
		let condition = 'where ';

		switch (timespan) {
			case 'today': condition += `${column} >= now()`
				break;
			case 'recent': condition += `${column} <= now()`
				break;
			case 'last_day': condition += `${column} >= date_trunc('day', now()) - interval '1 day'`
				break;
			case 'this_week': condition += `${column} >= date_trunc('week', now())`
				break;
			case 'this_month': condition += `${column} >= date_trunc('month', now())`
				break;
			case 'last_month': condition += `${column} >= date_trunc('month', now()) - interval '1 month' and ${column} < date_trunc('month', now())`
				break;
			case 'this_year': condition += `${column} >= date_trunc('year', now())`
				break;
			case 'last_year': condition += `${column} >= date_trunc('year', now()) - interval '1 year' and ${column} < date_trunc('year', now())`
				break;

			default: condition = ''
		}

		return condition;
	}
}

export default QueryExtend;
