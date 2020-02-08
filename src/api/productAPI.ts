import express, { Request, Response } from 'express';

const router = express.Router();

router.use('/product', (req: Request, res: Response) => {
	res.json({
		message: '/Hello'
	});
});

export default router;
