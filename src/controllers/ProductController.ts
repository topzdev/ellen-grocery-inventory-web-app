import { Response, Request } from 'express';
import ProductServices from '../services/ProductServices';
const productServices = new ProductServices()

class ProductController {
	constructor() {
		console.log('Product Controller');
	}

	async getSingleProduct(req: Request, res: Response): Promise<any> {
		try {
			const barcode = req.params.barcode;
			const result = await productServices.getProduct(barcode)
			console.log(result, 'controller')
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({ success: false, message: 'Something went wrong' })
		}
	}

	async getProducts(req: Request, res: Response): Promise<any> {
		try {
			const filter = req.query;
			const result = await productServices.getProducts(filter);
			return res.json({ success: true, ...result });
		} catch (error) {
			return res.status(400).json({ success: false, message: 'Something went wrong' })
		}
	}

	async addProduct(req: Request, res: Response): Promise<any> {
		try {
			const result = await productServices.createProduct(req.body, req.files)
			return res.json({ success: true, ...result });
		} catch (error) {
			console.log(error);
			return res.status(400).json({ success: false, message: error + 'Something went wrong' })
		}
	}

	async updateProduct(req: Request, res: Response): Promise<any> {
		try {
			const result = await productServices.updateProduct(req.body, req.files)
			res.json({ success: true, ...result });
		} catch (err) {
			console.error(err.stack);
		}
	}

	async deleteProduct(req: Request, res: Response): Promise<any> {
		try {
			const { product_id, image_id } = req.body;
			const result = await productServices.deleteProduct(product_id, image_id);
			res.json({ success: true, ...result });
		} catch (err) {
			console.log('Database error', err.stack);
		}
	}

}

export default ProductController;
