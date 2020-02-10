import express, { Request, Response } from 'express';
import ProductController from '../controllers/ProductController';
import { validate, rules } from './validations';

const router = express.Router();
const controller = new ProductController();
const { productRules } = rules;

//@route    GET api/product
//@desc     fetch all products
//@access   public
router.get('/', (req: Request, res: Response) => {
	controller.getProducts(req, res);
});

//@route    GET api/product
//@desc     fetch single product
//@access   public
//@params	id
router.get('/:barcode', (req: Request, res: Response) => {
	controller.getSingleProduct(req, res);
});

//@route    POST api/product
//@desc     add products
//@access   private

router.post('/', productRules(), validate, (req: Request, res: Response) => {
	controller.addProduct(req, res);
});

//@route    PUT api/product
//@desc     update products
//@access   private

router.put('/', (req: Request, res: Response) => {
	controller.updateProduct(req, res);
});

//@route    DELETE api/product
//@desc     delete products
//@access   private
//@params	id

router.delete('/:barcode', (req: Request, res: Response) => {
	controller.deleteProduct(req, res);
});

export default router;
