import express, { Request, Response } from 'express';
import ProductController from '../controllers/ProductController';
import { checkToken } from '../middleware';

const router = express.Router();
const controller = new ProductController();

/**
 * @route           GET api/product
 * @description     Search single product via barcode
 * @access          private
 * @param			{String} barcode
 */
router.get('/:barcode', checkToken, (req: Request, res: Response) => {
	controller.getSingleProduct(req, res);
});

/**
 * @route           GET api/product
 * @description     fetch all products
 * @access          public
 * @param			{String} barcode
 */
router.get('/', checkToken, (req: Request, res: Response) => {
	controller.getProducts(req, res);
});

/**
 * @route           POST api/product
 * @description     add products
 * @access          private
 * @param			{String} barcode
 */
router.post('/', checkToken, (req: Request, res: Response) => {
	controller.addProduct(req, res);
});

/**
 * @route           PUT api/product
 * @description     update products
 * @access          private
 */
router.put('/', checkToken, (req: Request, res: Response) => {
	controller.updateProduct(req, res);
});

/**
 * @route           DELETE api/product
 * @description     remove products temporarily
 * @access          private
 */
router.delete('/:id', checkToken, (req: Request, res: Response) => {
	controller.removeProduct(req, res);
});

/**
 * @route           DELETE api/product
 * @description     delete products permanently
 * @access          private
 */
router.delete('/admin/:id', checkToken, (req: Request, res: Response) => {
	controller.deleteProduct(req, res);
});

export default router;
