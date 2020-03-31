import { Vue, Component } from "vue-property-decorator";
import IProduct from "~/interfaces/IProduct";
import {
  productStore,
  IProductModule,
  frontendStore,
  IFrontendModule,
  processStore,
  IProcessModule
} from "@/store";

@Component
export default class ProductMixin extends Vue {
  public productStore: IProductModule;
  public frontendStore: IFrontendModule;
  public processStore: IProcessModule;

  constructor() {
    super();
    this.productStore = productStore;
    this.frontendStore = frontendStore;
    this.processStore = processStore;
  }

  // product state
  product: IProduct = {
    product_id: undefined,
    product_name: "",
    barcode: "",
    quantity_min: 1,
    quantity_max: 1,
    quantity: 1,
    price: 0,
    description: "",
    brand_id: -1,
    supplier_id: -1,
    category_id: -1,
    image: "",
    image_url: "",
    imageFile: undefined
  };

  // computed property
  get items() {
    return this.productStore.getAddonItems;
  }

  get productList() {
    return this.productStore.getProducts;
  }

  manageItem(item: IProduct) {
    this.processStore.setCurrentProduct(item);
    this.$router.push("products/product_manage");
  }

  deleteItem(item: IProduct) {
    // showing the dialog
    this.frontendStore.setDeleteModal({
      show: true,
      name: item.product_name,
      title: "Product"
    });

    // Assigning what delete function to be process
    this.processStore.setCurrentToDelete({
      deleteFunction: productStore.deleteProduct,
      id: item.product_id,
      others: item.image
    });
  }

  uploadImage(image: File) {
    if (!image) return this.product.image = undefined;

    let self = this;
    const reader = new FileReader();

    reader.onload = function (e) {
      self.product.image_url = e.target?.result;
      self.product.imageFile = image;
    }

    reader.readAsDataURL(image);
  }

  get setUrlImage() {
    return this.product.image_url ? this.product.image_url : require('~/assets/img/noimg.jpg')
  }

  // Rules
  rules: Object = {
    product_name: [(v: any) => !!v || "Product Name is required"],
    barcode: [(v: any) => !!v || "Barcode is required"],
    quantity: [
      (v: any) => !!v || "Quantity is required",
      (v: any) => v > 1 || "Quantity must be greater than 1",
      (v: any) => {
        console.log(this.product.quantity_max, this.product.quantity);
        return (
          v < this.product.quantity_max ||
          "Quantity should be less than the maximum quantity"
        );
      },
      (v: any) =>
        v >= this.product.quantity_min ||
        "Quantity should be more than the minimum quantity"
    ],
    quantity_min: [
      (v: any) => !!v || "Quantity Minimum is required",
      (v: any) => v >= 1 || "Quantity Minimum must be greater than 1"
    ],
    quantity_max: [
      (v: any) => !!v || "Quantity Maximum is required",
      (v: any) => v >= 1 || "Quantity Maximum must be greater than 1"
    ],
    price: [(v: any) => !!v || "Price is required"],
    brand_id: [(v: any) => !!v || "Brand is required"],
    supplier_id: [(v: any) => !!v || "Supplier Name is required"],
    category_id: [(v: any) => !!v || "Category is required"]
  };
}
