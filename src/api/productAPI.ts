import express, { Request, Response } from 'express';
import ProductController from '../controllers/ProductController';
import { validate, rules } from './validations';

const router = express.Router();
const controller = new ProductController();
const { productRules } = rules;

/**
 * @route           POST api/product
 * @description     add brand
 * @access          private
 */

router.post('/search/', (req: Request, res: Response) => {
	controller.productSearch(req, res);
});

/**
 * @route           GET api/product
 * @description     Search single product via barcode
 * @access          private
 * @param			{String} barcode
 */
router.get('/:barcode', (req: Request, res: Response) => {
	controller.getSingleProduct(req, res);
});

/**
 * @route           GET api/product
 * @description     fetch all products
 * @access          public
 * @param			{String} barcode
 */
router.get('/', (req: Request, res: Response) => {
	controller.getProducts(req, res);
});

/**
 * @route           POST api/product
 * @description     add products
 * @access          private
 * @param			{String} barcode
 */
router.post('/', productRules(), validate, (req: Request, res: Response) => {
	controller.addProduct(req, res);
});

/**
 * @route           PUT api/product
 * @description     update products
 * @access          private
 */
router.put('/', (req: Request, res: Response) => {
	controller.updateProduct(req, res);
});

/**
 * @route           DELETE api/product
 * @description     delete products
 * @access          private
 * @param 			{String} id
 */
router.delete('/:id', (req: Request, res: Response) => {
	controller.deleteProduct(req, res);
});

export default router;
