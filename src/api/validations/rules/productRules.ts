import { body } from 'express-validator';

const productRules = () => {
	return [
		body('product_name', 'Product name must be not empty')
			.not()
			.isEmpty(),
		body('barcode', 'Barcode must be not empty')
			.not()
			.isEmpty(),
		body('quantity', 'Quantity must be not empty')
			.not()
			.isEmpty(),
		body('price', 'Brand must be not empty')
			.not()
			.isEmpty(),
		body('brand', 'Brand must be not empty')
			.not()
			.isEmpty(),
		body('supplier_name', 'Supplier must be not empty')
			.not()
			.isEmpty(),
		body('category', 'Category must be not empty')
			.not()
			.isEmpty()
	];
};

export default productRules;
