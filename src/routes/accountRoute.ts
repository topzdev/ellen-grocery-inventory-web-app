import Express, { Request, Response } from 'express';
import AccountController from '../controllers/AccountController';
import { checkToken } from '../middleware'

const router = Express.Router();
const controller = new AccountController();

/**
 * @route           GET api/account
 * @description     fetch all accounts
 * @access          private
 */
router.get('/', checkToken, (req: Request, res: Response) => {
	controller.fetchAccounts(req, res);
});

/**
 * @route           GET api/account
 * @description     fetch singsle account
 * @access          private
 * @param			id
 */
router.get('/:id', checkToken, (req: Request, res: Response) => {
	controller.fetchSingleAccount(req, res);
});

/**
 * @route           POST api/account
 * @description     add account
 * @access          private
 */
router.post('/', checkToken, (req: Request, res: Response) => {
	controller.addAccount(req, res);
});

/**
 * @route           PUT api/account
 * @description     update account
 * @access          private
 */
router.put('/', checkToken, (req: Request, res: Response) => {
	controller.updateAccount(req, res);
});

/**
 * @route           PUT api/account/password
 * @description     update account password
 * @access          private
 */
router.put('/password', checkToken, (req: Request, res: Response) => {
	controller.updateAccountPassword(req, res);
});

/**
 * @route           DELETE api/account
 * @description     remove account termporary
 * @access          private
 * @param			id
 */
router.delete('/:id', checkToken, (req: Request, res: Response) => {
	controller.deleteAccount(req, res);
});

/**
 * @route           DELETE api/account/permanent
 * @description     delete account permanently
 * @access          private
 * @param			id
 */
router.delete('/admin/:id', checkToken, (req: Request, res: Response) => {
	controller.deleteAccount(req, res);
});


export default router;
