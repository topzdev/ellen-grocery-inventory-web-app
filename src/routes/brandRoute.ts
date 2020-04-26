import epxress, { Request, Response } from 'express';
import BrandController from '../controllers/BrandController';

const router = epxress.Router();

const controller = new BrandController();

/**
 * @route           GET api/brand
 * @description     fetch all brands
 * @access          public
 */
router.get('/', (req: Request, res: Response) => {
	controller.getBrands(req, res);
});

/**
 * @route           GET api/brand
 * @description     fetch singsle brand
 * @access          public
 * @param			id
 */
router.get('/:id', (req: Request, res: Response) => {
	controller.getSingleBrand(req, res);
});

/**
 * @route           POST api/brand
 * @description     add brand
 * @access          private
 */
router.post('/', (req: Request, res: Response) => {
	controller.addBrand(req, res);
});

/**
 * @route           PUT api/brand
 * @description     update brand
 * @access          private
 */
router.put('/', (req: Request, res: Response) => {
	controller.updateBrand(req, res);
});

/**
 * @route           DELETE api/brand
 * @description     delete brand
 * @access          private
 */
router.delete('/:id', (req: Request, res: Response) => {
	controller.deleteBrand(req, res);
});

export default router;
