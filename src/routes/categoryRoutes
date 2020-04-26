import express, { Request, Response } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = express.Router();

const controller = new CategoryController();

/**
 * @route           GET api/category
 * @description     fetch all category
 * @access          public
 */

router.get('/', (req: Request, res: Response) => {
	controller.getCategories(req, res);
});

/**
 * @route           GET api/category 
 * @description     fetch single category
 * @access          public
 * @param			id
 */
router.get('/:id', (req: Request, res: Response) => {
	controller.getSingleCategory(req, res);
});

/**
 * @route           POST api/category
 * @description     add category
 * @access          private
 */
router.post('/', (req: Request, res: Response) => {
	controller.addCategory(req, res);
});

/**
 * @route           PUT api/category
 * @description     update category
 * @access          private
 */
router.put('/', (req: Request, res: Response) => {
	controller.updateCategory(req, res);
});

/**
 * @route           PUT api/category
 * @description     update category
 * @access          private
 * @param           id
 */
router.delete('/:id', (req: Request, res: Response) => {
	controller.deleteCategory(req, res);
});

export default router;
