import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import { productAPI } from './api/index';

class Server {
	public app: Express;

	constructor() {
		this.app = express();
		this.mountMiddleware();
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

		this.app.use('/', router);
	}

	private mountMiddleware(): void {
		// body parser
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
	}
}

export default new Server().app;
