import { Client } from 'pg';

require('dotenv').config();

export default new Client({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: parseInt(process.env.PGPORT + '')
});
