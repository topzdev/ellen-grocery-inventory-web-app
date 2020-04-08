import express, { Request, Response } from 'express'
import TransactionController from '../controllers/TransactionController'

const router = express.Router();
const controllers = new TransactionController();

/**
 * @route           GET api/product
 * @description     fetch single products
 * @access          private
 * @param			{String} id as transact_id
 */
router.get('/:id', (req: Request, res: Response) => {
    controllers.fetchSingleTransaction(req, res)
})


/**
 * @route           GET api/product
 * @description     fetch single product
 * @access          private
 * @param			{String} id as transact_id
 */
router.get('/', (req: Request, res: Response) => {
    controllers.fetchTransaction(req, res)
})


/**
 * @route           GET api/product
 * @description     fetch products
 * @access          private
 * @param			{String} id as transact_id
 */
router.post('/', (req: Request, res: Response) => {
    controllers.addTransaction(req, res)
})


/**
 * @route           GET api/product
 * @description     fetch products
 * @access          private
 * @param			{String} id as transact_id
 */
router.put('/', (req: Request, res: Response) => {
    controllers.updateTransaction(req, res)
})

/**
 * @route           GET api/product
 * @description     delete product
 * @access          private
 * @param			{String} id as transact_id
 */
router.delete('/:id', (req: Request, res: Response) => {
    controllers.deleteTransaction(req, res)
})

export default router;

