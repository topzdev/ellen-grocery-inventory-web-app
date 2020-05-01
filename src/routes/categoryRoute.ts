import express, { Request, Response } from 'express';
import CategoryController from '../controllers/CategoryController';
import { checkToken } from '../middleware';

const router = express.Router();

const controller = new CategoryController();

/**
 * @route           GET api/category
 * @description     fetch all category
 * @access          public
 */

router.get('/', checkToken, (req: Request, res: Response) => {
    controller.getCategories(req, res);
});

/**
 * @route           GET api/category 
 * @description     fetch single category
 * @access          public
 * @param			id
 */
router.get('/:id', checkToken, (req: Request, res: Response) => {
    controller.getSingleCategory(req, res);
});

/**
 * @route           POST api/category
 * @description     add category
 * @access          private
 */
router.post('/', checkToken, (req: Request, res: Response) => {
    controller.addCategory(req, res);
});

/**
 * @route           PUT api/category
 * @description     update category
 * @access          private
 */
router.put('/', checkToken, (req: Request, res: Response) => {
    controller.updateCategory(req, res);
});

/**
 * @route           PUT api/category
 * @description     update category
 * @access          private
 * @param           id
 */
router.delete('/:id', checkToken, (req: Request, res: Response) => {
    controller.deleteCategory(req, res);
});

export default router;