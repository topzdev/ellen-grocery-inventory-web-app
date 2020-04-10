import Express, { Request, Response } from 'express';
import RoleController from '../controllers/RoleController';

const router = Express.Router();
const controller = new RoleController();

/**
 * @route           GET api/role
 * @description     fetch all roles
 * @access          public
 */
router.get('/', (req: Request, res: Response) => {
	controller.fetchRoles(req, res);
});

/**
 * @route           GET api/role
 * @description     fetch singsle role
 * @access          public
 * @param			id
 */
router.get('/:id', (req: Request, res: Response) => {
	controller.fetchSingleRole(req, res);
});

/**
 * @route           POST api/role
 * @description     add role
 * @access          private
 */
router.post('/', (req: Request, res: Response) => {
	controller.addRole(req, res);
});

/**
 * @route           PUT api/role
 * @description     update role
 * @access          private
 */
router.put('/', (req: Request, res: Response) => {
	controller.updateRole(req, res);
});

/**
 * @route           DELETE api/role
 * @description     delete role
 * @access          private
 */
router.delete('/:id', (req: Request, res: Response) => {
	controller.deleteRole(req, res);
});

export default router;
