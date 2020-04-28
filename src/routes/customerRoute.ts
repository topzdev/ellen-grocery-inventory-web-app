import express, { Request, Response } from 'express';
import CustomerController from '../controllers/CustomerController';

const router = express.Router();
const controller = new CustomerController();

/**
 * @route           GET api/customer
 * @description     fetch all customers
 * @access          public
 */
router.get('/', (req: Request, res: Response) => {
	controller.fetchCustomers(req, res);
});

/**
 * @route           GET api/customer
 * @description     fetch singsle customer
 * @access          public
 * @param			id
 */
router.get('/:id', (req: Request, res: Response) => {
	controller.fetchSingleCustomer(req, res);
});

/**
 * @route           POST api/customer
 * @description     add customer
 * @access          private
 */
router.post('/', (req: Request, res: Response) => {
	controller.addCustomer(req, res);
});

/**
 * @route           PUT api/customer
 * @description     update customer
 * @access          private
 */
router.put('/', (req: Request, res: Response) => {
	controller.updateCustomer(req, res);
});

/**
 * @route           DELETE api/customer
 * @description     delete customer
 * @access          private
 */
router.delete('/:id', (req: Request, res: Response) => {
	controller.removeCustomer(req, res);
});

/**
 * @route           DELETE api/customer
 * @description     delete customer
 * @access          private
 */
router.delete('/admin/:id', (req: Request, res: Response) => {
	controller.deleteCustomer(req, res);
});

export default router;
