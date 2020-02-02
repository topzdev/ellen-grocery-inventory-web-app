import { Pool } from 'pg';

const pool = new Pool();
module.exports = {
	//@ts-ignore
	query: (text, params, callback) => {
		const start = Date.now();
		//@ts-ignore
		return pool.query(text, params, (err, res) => {
			const duration = Date.now() - start;
			console.log('executed query', {
				text,
				duration,
				rows: res.rowCount
			});
			callback(err, res);
		});
	}
};
