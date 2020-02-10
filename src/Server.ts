import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { productAPI, supplierAPI } from './api/index';

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

		router.use('/api/product', productAPI);
		router.use('/api/supplier', supplierAPI);

		this.app.use('/', router);
	}

	private mountMiddleware(): void {
		// body parser
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());
		// cors
		this.app.use(cors());
	}
}

export default new Server().app;
