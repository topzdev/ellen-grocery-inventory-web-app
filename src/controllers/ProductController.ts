import { Response, Request, Express } from 'express';
import QueryExtend from './extends/QueryExtend';
class ProductController extends QueryExtend {
	public async addProduct(req: Request, res: Response) {
		this.client.q;
	}
}

export default new ProductController();
