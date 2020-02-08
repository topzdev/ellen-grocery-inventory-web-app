import express, { Request, Response, Express } from 'express';
import { productAPI } from './api/index';

class Server {
	public express: Express;

	constructor() {
		this.express = express();
		this.mountRoutes();
	}

	private mountRoutes(): void {
		const router = express.Router();
		router.get('/', (req: Request, res: Response) => {
			res.json({
				message: 'Hello, World'
			});
		});

		router.use('/api', productAPI);

		this.express.use('/', router);
	}
}

export default new Server().express;
