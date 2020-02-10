import { body } from 'express-validator';

const supplierRules = () => {
	return [
		body('supplier_name', 'Product name must be not empty')
			.not()
			.isEmpty(),
		body('email', 'Email address is invalid').isEmail(),
		body('address', 'Address must be not empty')
			.not()
			.isEmpty()
	];
};

export default supplierRules;
