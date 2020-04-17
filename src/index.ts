import { Client } from 'pg';
import databaseConfig from './configs/database';
import cloudinaryConfig from './configs/cloudinary';
import cloudinary from 'cloudinary';
import Server from './Server';

cloudinary.v2.config(cloudinaryConfig);

const database = new Client(databaseConfig);

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Current listening at PORT: ${PORT}`));
