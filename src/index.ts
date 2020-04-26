import { Client } from 'pg';
import cloudinary from 'cloudinary';
import config from './config';
import Server from './Server';

cloudinary.v2.config(config.cloudinary);

const database = new Client(config.database);

database.on('error', (err: Error) => {
	console.error('Unexpected error on idle client', err) // your callback here
	process.exit(-1)
})

database.connect();

database.query('SELECT NOW()', (err, res) => {
	if (err) return console.error("Connection problem with database", err.stack);
	console.log('Database connected');
	database.end();
})

const app = Server;

const PORT = config.port || 5000;

app.listen(PORT, () => console.log(`Current listening at PORT: ${PORT}`));
