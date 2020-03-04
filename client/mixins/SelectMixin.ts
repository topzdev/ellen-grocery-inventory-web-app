import { Component, Vue, Prop } from "vue-property-decorator";
import { brandStore, categoryStore, supplierStore } from "@/store";

@Component({ inheritAttrs: false })
export default class SelectMixin extends Vue {
  @Prop(Number) value: number | undefined;

  get category() {
    return categoryStore.getCategories;
  }

  get suppliers() {
    return supplierStore.getSupplier;
  }

  get brands() {
    return brandStore.getBrands;
  }

  input(value: number) {
    this.$emit("input", value);
  }
}
