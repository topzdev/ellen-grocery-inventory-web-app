<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn to="/others" />
      <v-toolbar-title class="pl-2">Add Product</v-toolbar-title>
    </v-toolbar>
    <v-form ref="productForm" v-model="valid">
      <v-container>
        <v-row style="margin-top: -60px;">
          <v-col cols="4">
            <product-image-uploader :uploader="uploadImage" :url="setUrlImage"></product-image-uploader>
          </v-col>
          <v-col cols="8">
            <v-card>
              <v-toolbar flat>
                <v-toolbar-title>Product Information</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-row>
                  <v-col cols="6">
                    <v-text-field
                      v-model="product.barcode"
                      :rules="rules.barcode"
                      label="Barcode"
                      required
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="product.product_name"
                      :rules="rules.product_name"
                      label="Product Name"
                      required
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="product.price"
                      :rules="rules.price"
                      type="number"
                      label="Price"
                      required
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="product.quantity_max"
                      type="number"
                      :rules="rules.quantity_max"
                      label="Max Quantity"
                      required
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="product.quantity_min"
                      type="number"
                      :rules="rules.quantity_min"
                      label="Min Quantity"
                      required
                    />
                  </v-col>
                  <v-col cols="3">
                    <v-text-field
                      v-model.number="product.quantity"
                      :rules="rules.quantity"
                      type="number"
                      label="Quantity"
                      required
                    />
                  </v-col>
                  <v-col cols="6">
                    <base-select
                      v-model.number="product.brand_id"
                      :items="brands"
                      item-value="brand_id"
                      item-text="brand_name"
                      label="Brand"
                      modal-name="Brand"
                      :rules="rules.brand_id"
                    />
                  </v-col>
                  <v-col cols="6">
                    <base-select
                      v-model.number="product.supplier_id"
                      :items="suppliers"
                      item-value="supplier_id"
                      item-text="supplier_name"
                      label="Supplier"
                      modal-name="Supplier"
                      :rules="rules.supplier_id"
                    />
                  </v-col>
                  <v-col cols="6">
                    <base-select
                      v-model.number="product.category_id"
                      :items="categories"
                      item-value="category_id"
                      item-text="category_name"
                      label="Category"
                      modal-name="Category"
                      :rules="rules.category_id"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      v-model="product.description"
                      :auto-grow="true"
                      label="Description"
                      :value="product.description"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="success"
                  class="d-flex ml-auto"
                  text
                  large
                  @click="validate"
                >Add Product</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import ProductMixin from "@/mixins/ProductMixin";
import ProductCRUD from "../../mixins/ProductCRUD";
import { productStore, frontendStore } from "../../store";

@Component({
  middleware: ["auth"]
})
export default class add extends Mixins(ProductMixin, ProductCRUD) {
  valid: boolean = false;
  dialog: boolean = true;

  validate(): void {
    // @ts-ignore
    if (this.$refs.productForm.validate()) {
      productStore.addProduct(this.product);
    }
  }

  mounted() {
    frontendStore.setBarcodeModal(false);
  }

  destroyed() {
    frontendStore.setBarcodeModal(false);
  }
}
</script>