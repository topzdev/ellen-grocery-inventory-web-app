<template>
  <v-form ref="addForm" v-model="valid" :lazy-validation="true">
    <!-- <barcode-dialog v-model="dialog" /> -->
    <v-card class="py-4 px-5 mt-5">
      <h1 class="mb-2">Add Products</h1>
      <v-divider />
      <v-row>
        <v-col cols="8">
          <v-row>
            <v-col cols="6" class="pb-0">
              <v-text-field
                v-model="product.productName"
                :rules="rules.productName"
                label="Product Name"
                required
              />
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-text-field
                v-model="product.price"
                :rules="rules.price"
                type="number"
                label="Price"
                required
              />
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-text-field
                v-model="product.quantity"
                :rules="rules.quantity"
                type="number"
                label="Quantity"
                required
              />
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-select
                v-model="product.brand"
                :rules="rules.brand"
                :items="items.brand"
                label="Brand"
              />
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-select
                v-model="product.supplierName"
                :rules="rules.supplierName"
                :items="items.supplier"
                label="Supplier Name"
              />
            </v-col>
            <v-col cols="6" class="pb-0">
              <v-select
                v-model="product.category"
                :rules="rules.category"
                :items="items.category"
                label="Category"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea :auto-grow="true" label="Description" :value="product.description" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" class="d-flex flex-column align-center justify-start">
          <p>Upload Product Image</p>
          <v-avatar class="mb-2" color="grey" size="250">
            <!-- <img src alt="John" draggable="false" /> -->
          </v-avatar>
          <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Upload Image"
            prepend-icon="mdi-camera"
            label="Product image"
            width="100%"
          />
        </v-col>
        <v-col cols="12">
          <v-divider />
          <v-row>
            <v-col class="d-flex">
              <v-btn class="mr-4" large>Cancel</v-btn>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 d-flex ml-auto"
                @click="validate"
                large
              >Add Product</v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProductInfoMixins from "@/mixins/ProductInformation";
import BarcodeDialog from "@/components/dialog/BarcodeDialog.vue";
import { productStore } from "@/store";
@Component({
  components: {
    BarcodeDialog
  }
})
export default class add extends ProductInfoMixins {
  valid: boolean = false;
  dialog: boolean = true;

  get items() {
    return productStore.getAddonItems;
  }

  public validate(): void {
    // @ts-ignore
    if (this.$refs.addForm.validate()) {
      this.insertProduct();
    }
  }

  private insertProduct(): void {
    console.log(this.product);
    productStore.addProduct(this.product);
  }
}
</script>
