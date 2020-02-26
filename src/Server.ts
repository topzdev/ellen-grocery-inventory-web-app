import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import { productAPI, supplierAPI, categoryAPI, brandAPI } from './api/index';

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
		router.use('/api/brand', brandAPI);
		router.use('/api/category', categoryAPI);

		this.app.use('/', router);
	}

	private mountMiddleware(): void {
		// body parser
		this.app.use(bodyParser.urlencoded({ extended: false }));
		this.app.use(bodyParser.json());

		// cors
		this.app.use(cors());

		// file-uploader
		this.app.use(fileUpload({ useTempFiles: true }));
	}
}

export default new Server().app;
