import { Vue, Component } from "vue-property-decorator";
import ProductInterface from "@/interfaces/productInfoInterface";

@Component
export default class ProductInformation extends Vue {
  product: ProductInterface = {
    productName: "",
    barcode: "",
    quantity: 0,
    price: 0.0,
    description: "",
    brand: "",
    supplierName: "",
    category: "",
    image: "",
    rules: {
      minQuantity: 0,
      maxQuantity: 0
    }
  };

  rules: Object = {
    productName: [(v: any) => !!v || "Product Name is required"],
    barcode: [(v: any) => !!v || "Barcode is required"],
    quantity: [
      (v: any) => !!v || "Quantity is required",
      (v: any) => v > 1 || "Quantity must be greate than 1"
    ],
    price: [(v: any) => !!v || "Price is required"],
    brand: [(v: any) => !!v || "Brand is required"],
    supplierName: [(v: any) => !!v || "Supplier Name is required"],
    category: [(v: any) => !!v || "Category is required"]
  };
}
