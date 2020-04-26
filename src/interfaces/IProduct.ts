interface IProduct {
	product_id?: number;
	product_name: string;
	barcode: string;
	quantity: number;
	quantity_min: number;
	quantity_max: number;
	price: number;
	description: string;
	brand_id: string;
	supplier_id: string;
	category_id: string;
	image_id?: string;
	image_url?: string;
	created_at?: string;
}

export default IProduct;