export default interface IProduct {
  product_id?: number;
  product_name: string;
  barcode: string;
  quantity: number;
  quantity_min: number;
  quantity_max: number;
  price: number;
  description: string;
  brand_id: number;
  supplier_id: number;
  category_id: number;
  image_id: string | ArrayBuffer | null | undefined;
  image_url: string | ArrayBuffer | null | undefined;
  imageFile: File | undefined;
  created_at?: string;
  updated_at?: string;
  is_deleted: boolean
}
