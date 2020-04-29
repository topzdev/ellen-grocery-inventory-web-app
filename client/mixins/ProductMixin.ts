import { Vue, Component, Watch } from "vue-property-decorator";
import IProduct from "~/interfaces/IProduct";
import { brandStore, categoryStore, supplierStore, } from "@/store";
import ProductImageUploader from '@/components/product/ProductImageUploader.vue'

@Component({
  components: { ProductImageUploader }
})
export default class ProductMixin extends Vue {

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
    image_id: "",
    image_url: "",
    imageFile: undefined
  };


  uploadImage(image: any): any {
    if (!image.target.files.length) return this.product.image_id = undefined;

    let self = this;
    const reader = new FileReader();

    reader.onload = function (e) {
      self.product.image_url = e.target?.result;
      self.product.imageFile = image;
    }

    reader.readAsDataURL(image.target.files[0]);
  }

  get setUrlImage() {
    return this.product.image_url ? this.product.image_url : require('~/assets/img/noimg.jpg')
  }

  get categories() {
    return categoryStore.categories;
  }

  get suppliers() {
    return supplierStore.suppliers;
  }

  get brands() {
    return brandStore.brands;
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



