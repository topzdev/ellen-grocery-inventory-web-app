import express, { Request, Response, Express } from 'express';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import {
	productRoute,
	supplierRoute,
	categoryRoute,
	brandRoute,
	customerRoute,
	accountRoute,
	roleRoute,
	transactionRoute,
	statisticRoute
} from './routes/index';

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

		router.use('/api/product', productRoute);
		router.use('/api/supplier', supplierRoute);
		router.use('/api/brand', brandRoute);
		router.use('/api/category', categoryRoute);
		router.use('/api/customer', customerRoute);
		router.use('/api/account', accountRoute);
		router.use('/api/role', roleRoute);
		router.use('/api/transaction', transactionRoute)
		router.use('/api/statistic', statisticRoute)

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
