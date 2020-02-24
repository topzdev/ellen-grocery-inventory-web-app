<template>
  <v-form ref="productForm" v-model="valid">
    <v-toolbar :flat="true">
      <v-toolbar-title class="display-1 font-weight-bold">Add Product</v-toolbar-title>
    </v-toolbar>
    <v-row class="px-3">
      <v-col cols="8">
        <v-row>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="product.barcode"
              :rules="rules.barcode"
              label="Barcode"
              required
            />
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="product.product_name"
              :rules="rules.product_name"
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
              v-model="product.supplier_name"
              :rules="rules.supplier_name"
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
            <v-textarea
              :auto-grow="true"
              label="Description"
              :value="product.description"
              v-model="product.description"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4" class="d-flex flex-column align-center justify-start">
        <p>Upload Product Image</p>
        <v-avatar class="mb-2" color="grey" size="250">
          <img :src="product.image" alt="John" draggable="false" />
        </v-avatar>
        <v-text-field v-model="product.image" label="Image" required />

        <!-- <v-file-input
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Upload Image"
            prepend-icon="mdi-camera"
            label="Product image"
            width="100%"
        />-->
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
              large
              @click="validate"
            >Add Product</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProductInfoMixin from "@/mixins/ProductInfoMixin";

@Component
export default class add extends ProductInfoMixin {
  valid: boolean = false;
  dialog: boolean = true;

  validate(): void {
    // @ts-ignore
    if (this.$refs.productForm.validate()) {
      this.insertProduct();
    }
  }

  insertProduct(): void {
    this.productStore.addProduct(this.product);
  }

  mounted() {
    this.frontendStore.setBarcodeModal(true);
  }

  destroyed() {
    this.frontendStore.setBarcodeModal(false);
  }
}
</script>
