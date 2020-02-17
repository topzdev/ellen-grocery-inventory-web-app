import { Vue, Component } from "vue-property-decorator";
import IProduct from "@/interfaces/productInfoInterface";
import { productStore, IProductModule } from "@/store";

@Component
export default class ProductInformation extends Vue {
  public productStore: IProductModule;

  constructor() {
    super();
    this.productStore = productStore;
  }

  // product state
  product: IProduct = {
    product_name: "",
    barcode: "",
    quantity: 0,
    price: 0,
    description: "",
    brand: "",
    supplier_name: "",
    category: "",
    image: "",
    rules: {
      minQuantity: 0,
      maxQuantity: 0
    }
  };

  // computed property
  get items() {
    return productStore.getAddonItems;
  }

  // Rules
  rules: Object = {
    product_name: [(v: any) => !!v || "Product Name is required"],
    barcode: [(v: any) => !!v || "Barcode is required"],
    quantity: [
      (v: any) => !!v || "Quantity is required",
      (v: any) => v > 1 || "Quantity must be greater than 1"
    ],
    price: [(v: any) => !!v || "Price is required"],
    brand: [(v: any) => !!v || "Brand is required"],
    supplier_name: [(v: any) => !!v || "Supplier Name is required"],
    category: [(v: any) => !!v || "Category is required"]
  };
}
