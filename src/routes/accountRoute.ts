import Express, { Request, Response } from 'express';
import AccountController from '../controllers/AccountController';

const router = Express.Router();
const controller = new AccountController();

/**
 * @route           GET api/account
 * @description     fetch all accounts
 * @access          public
 */
router.get('/', (req: Request, res: Response) => {
	controller.fetchAccounts(req, res);
});

/**
 * @route           GET api/account
 * @description     fetch singsle account
 * @access          public
 * @param			id
 */
router.get('/:id', (req: Request, res: Response) => {
	controller.fetchSingleAccount(req, res);
});

/**
 * @route           POST api/account
 * @description     add account
 * @access          private
 */
router.post('/', (req: Request, res: Response) => {
	controller.addAccount(req, res);
});

/**
 * @route           PUT api/account
 * @description     update account
 * @access          private
 */
router.put('/', (req: Request, res: Response) => {
	controller.updateAccount(req, res);
});

/**
 * @route           PUT api/account/password
 * @description     update account password
 * @access          private
 */
router.put('/password', (req: Request, res: Response) => {
	controller.updateAccountPassword(req, res);
});

/**
 * @route           DELETE api/account
 * @description     remove account termporary
 * @access          private
 * @param			id
 */
router.delete('/:id', (req: Request, res: Response) => {
	controller.deleteAccount(req, res);
});

/**
 * @route           DELETE api/account/permanent
 * @description     delete account permanently
 * @access          private
 * @param			id
 */
router.delete('/permanent/:id', (req: Request, res: Response) => {
	controller.deleteAccount(req, res);
});


export default router;
