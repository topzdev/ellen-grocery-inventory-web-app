interface RulesInterface {
  minQuantity: number;
  maxQuantity: number;
}

export default interface IProduct {
  product_name: string;
  barcode: string;
  quantity: number;
  price: number;
  description: string;
  brand: string;
  supplier_name: string;
  category: string;
  image: string;
  rules: RulesInterface;
}
