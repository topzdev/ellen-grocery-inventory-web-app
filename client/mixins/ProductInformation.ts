import { Vue, Component } from "vue-property-decorator";
import ProductInterface from "@/interfaces/productInfoInterface";

@Component
export default class ProductInformation extends Vue {
  product: ProductInterface = {
    product_name: "31",
    barcode: "31",
    quantity: 51,
    price: 51,
    description: "313",
    brand: "nestle",
    supplier_name: "Beth Corp",
    category: "31",
    image: "313",
    rules: {
      minQuantity: 0,
      maxQuantity: 0
    }
  };

  rules: Object = {
    product_name: [(v: any) => !!v || "Product Name is required"],
    barcode: [(v: any) => !!v || "Barcode is required"],
    quantity: [
      (v: any) => !!v || "Quantity is required",
      (v: any) => v > 1 || "Quantity must be greate than 1"
    ],
    price: [(v: any) => !!v || "Price is required"],
    brand: [(v: any) => !!v || "Brand is required"],
    supplier_name: [(v: any) => !!v || "Supplier Name is required"],
    category: [(v: any) => !!v || "Category is required"]
  };
}
