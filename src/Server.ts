import express, { Request, Response, Express } from 'express';

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

		this.express.use('/', router);
	}
}

export default new Server().express;
