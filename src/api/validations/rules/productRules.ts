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
		body('quantity_max', 'Quantity must be not empty')
			.not()
			.isEmpty(),
		body('quantity_min', 'Quantity must be not empty')
			.not()
			.isEmpty(),
		body('price', 'Brand must be not empty')
			.not()
			.isEmpty(),
		body('brand_id', 'Brand must be not empty')
			.not()
			.isEmpty(),
		body('supplier_id', 'Supplier must be not empty')
			.not()
			.isEmpty(),
		body('category_id', 'Category must be not empty')
			.not()
			.isEmpty()
	];
};

export default productRules;
