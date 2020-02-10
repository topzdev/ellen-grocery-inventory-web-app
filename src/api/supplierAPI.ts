import express, { Request, Response } from 'express';
import SupplierController from '../controllers/SupplierController';
import { validate, rules } from './validations';

const router = express.Router();
const controller = new SupplierController();
const { supplierRules } = rules;
//@route    GET api/supplier
//@desc     fetch suppliers
//@access   public

router.get('/', (req: Request, res: Response) => {
	controller.getSuppliers(req, res);
});

//@route    GET api/supplier
//@desc     fetch single suppliers
//@access   public
//@params	id

router.get('/:id', (req: Request, res: Response) => {
	controller.getSingleSupplier(req, res);
});

//@route    POST api/supplier
//@desc     add single suppliers
//@access   private

router.post('/', supplierRules(), validate, (req: Request, res: Response) => {
	controller.addSupplier(req, res);
});

//@route    PUT api/supplier
//@desc     update supplier
//@access   private
//@params	id

router.put('/', (req: Request, res: Response) => {
	controller.updateSupplier(req, res);
});

//@route    DELETE api/supplier
//@desc     delete supplier
//@access   private
//@params	id

router.delete('/:id', (req: Request, res: Response) => {
	controller.deleteSupplier(req, res);
});

export default router;
