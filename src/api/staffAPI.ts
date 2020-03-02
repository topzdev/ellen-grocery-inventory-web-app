import Express, { Request, Response } from 'express';
import StaffController from '../controllers/StaffController';

const router = Express.Router();
const controller = new StaffController();

/**
 * @route           GET api/staff
 * @description     fetch all staffs
 * @access          public
 */
router.get('/', (req: Request, res: Response) => {
	controller.fetchStaffs(req, res);
});

/**
 * @route           GET api/staff
 * @description     fetch singsle staff
 * @access          public
 * @param			id
 */
router.get('/:id', (req: Request, res: Response) => {
	controller.fetchSingleStaff(req, res);
});

/**
 * @route           POST api/staff
 * @description     add staff
 * @access          private
 */
router.post('/', (req: Request, res: Response) => {
	controller.addStaff(req, res);
});

/**
 * @route           PUT api/staff
 * @description     update staff
 * @access          private
 */
router.put('/', (req: Request, res: Response) => {
	controller.updateStaff(req, res);
});

/**
 * @route           DELETE api/staff
 * @description     delete staff
 * @access          private
 */
router.delete('/', (req: Request, res: Response) => {
	controller.deleteStaff(req, res);
});

export default router;
