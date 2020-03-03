export default interface IProduct {
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
	image?: string | undefined;
	created_at?: string;
}
