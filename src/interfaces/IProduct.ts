import IUploadedImage from "./IUploadedImage";

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
	image_id?: IUploadedImage['image_id'];
	image_url?: IUploadedImage['image_url'];
	created_at?: string;
	updated_at?: string;
	isDeleted: boolean
	image: any
}

export default IProduct;