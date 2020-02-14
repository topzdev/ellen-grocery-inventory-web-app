/*
    approach reference: https://dev.to/nedsoft/a-clean-approach-to-using-express-validator-8go
*/
import productRules from './rules/productRules';
import supplierRules from './rules/supplierRules';

import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

const validate = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);

	if (errors.isEmpty()) {
		return next();
	}
	const extractedErrors: Array<object> = [];

	errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

	return res.status(422).json({
		message: 'Error, some fields are empty or incorrect format',
		errors: extractedErrors
	});
};

const rules = {
	productRules,
	supplierRules
};

export { validate, rules };
