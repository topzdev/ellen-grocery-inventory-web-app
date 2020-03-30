<template>
  <v-form ref="productForm" v-model="valid">
    <v-card flat>
      <v-card-actions>
        <back-btn to="/others" title="Add Product" />
      </v-card-actions>
      <v-row class="px-3">
        <v-col cols="12">
          <v-card>
            <v-card-text>
              <v-row class="px-4">
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
                    <v-col cols="3" class="pb-0">
                      <v-text-field
                        v-model.number="product.price"
                        :rules="rules.price"
                        type="number"
                        label="Price"
                        required
                      />
                    </v-col>
                    <v-col cols="3" class="pb-0">
                      <v-text-field
                        v-model.number="product.quantity_max"
                        type="number"
                        :rules="rules.quantity_max"
                        label="Max Quantity"
                        required
                      />
                    </v-col>
                    <v-col cols="3" class="pb-0">
                      <v-text-field
                        v-model.number="product.quantity_min"
                        type="number"
                        :rules="rules.quantity_min"
                        label="Min Quantity"
                        required
                      />
                    </v-col>
                    <v-col cols="3" class="pb-0">
                      <v-text-field
                        v-model.number="product.quantity"
                        :rules="rules.quantity"
                        type="number"
                        label="Quantity"
                        required
                      />
                    </v-col>
                    <v-col cols="6" class="pb-0">
                      <brand-select v-model.number="product.brand_id" :rules="rules.brand_id" />
                    </v-col>
                    <v-col cols="6" class="pb-0">
                      <supplier-select
                        v-model.number="product.supplier_id"
                        :rules="rules.supplier_id"
                      />
                    </v-col>
                    <v-col cols="6" class="pb-0">
                      <category-select
                        v-model.number="product.category_id"
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
                </v-col>
                <v-col cols="4">
                  <p>Upload Product Image</p>
                  <v-card height="250px" width="250px" class="mb-4">
                    <v-img :src="product.image_url" width="100%" height="100%" draggable="false"></v-img>
                  </v-card>

                  <v-file-input
                    accept="image/png, image/jpeg, image/bmp"
                    placeholder="Upload Image"
                    prepend-icon="mdi-camera"
                    label="Product image"
                    width="100%"
                    @change="uploadImage"
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <!-- <v-divider /> -->
            <v-card-actions>
              <v-spacer />
              <v-btn class="mr-4" large>Cancel</v-btn>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 d-flex ml-auto"
                large
                @click="validate"
              >Add Product</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProductMixin from "@/mixins/ProductMixin";

@Component
export default class add extends ProductMixin {
  
  valid: boolean = false;
  dialog: boolean = true;

  validate(): void {
    // @ts-ignore
    if (this.$refs.productForm.validate()) {
      this.productStore.addProduct(this.product);
    }
  }

  mounted() {
    this.frontendStore.setBarcodeModal(false);
  }

  destroyed() {
    this.frontendStore.setBarcodeModal(false);
  }
}
</script>
