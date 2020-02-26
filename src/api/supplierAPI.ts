import express, { Request, Response } from 'express';
import SupplierController from '../controllers/SupplierController';
import { validate, rules } from './validations';

const router = express.Router();
const controller = new SupplierController();
const { supplierRules } = rules;

/**
 * @route           GET api/supplier
 * @description     fetch suppliers
 * @access          public
 */
router.get('/', (req: Request, res: Response) => {
	controller.getSuppliers(req, res);
});

/**
 * @route           GET api/supplier
 * @description     fetch single suppliers
 * @access          public
 * @param 			{String} id
 */
router.get('/:id', (req: Request, res: Response) => {
	controller.getSingleSupplier(req, res);
});

/**
 * @route           POST api/supplier
 * @description     add single suppliers
 * @access          private
 */
router.post('/', supplierRules(), validate, (req: Request, res: Response) => {
	controller.addSupplier(req, res);
});

/**
 * @route           PUT api/supplier
 * @description     update supplier
 * @access          private
 */
router.put('/', (req: Request, res: Response) => {
	controller.updateSupplier(req, res);
});

/**
 * @route           DELETE api/supplier
 * @description     delete supplier
 * @access          private
 * @param 			{String} id
 */
router.delete('/:id', (req: Request, res: Response) => {
	controller.deleteSupplier(req, res);
});

export default router;
