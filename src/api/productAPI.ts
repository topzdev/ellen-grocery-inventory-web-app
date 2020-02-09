import express, { Request, Response } from 'express';
const router = express.Router();

import ProductController from '../controllers/ProductController';

const controller = new ProductController();

router.get('/product/:barcode', (req: Request, res: Response) => {
	controller.getSingleProduct(req, res);
});

router.get('/product', (req: Request, res: Response) => {
	controller.getProducts(req, res);
});

router.post('/product', (req: Request, res: Response) => {
	controller.addProduct(req, res);
});

router.delete('/product/:barcode', (req: Request, res: Response) => {
	controller.deleteProduct(req, res);
});

router.put('/product', (req: Request, res: Response) => {
	controller.updateProduct(req, res);
});

export default router;
