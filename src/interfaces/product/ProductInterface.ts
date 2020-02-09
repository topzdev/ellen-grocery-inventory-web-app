interface RulesInterface {
	minQuantity: number;
	maxQuantity: number;
}

export default interface ProductInterface {
	product_name: string;
	barcode: string;
	quantity: number;
	price: number;
	description: string;
	brand: string;
	supplier_name: string;
	category: string;
	image: string;
	created_at: string;
}
