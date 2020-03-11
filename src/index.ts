import Database from './configs/database';
import cloudinaryConfig from './configs/cloudinary';
import cloudinary from 'cloudinary';
import Server from './Server';

// cloudinary.v2.config(cloudinaryConfig);

Database.connect((err: Error) =>
	err
		? console.error('Databse Connection error', err.stack)
		: console.log('Database Succesfully Connected')
);

const app = Server;

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Current listening at PORT: ${PORT}`));
