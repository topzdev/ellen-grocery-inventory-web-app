<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn />
      <v-toolbar-title class="pl-2">Edit Product</v-toolbar-title>
    </v-toolbar>
    <v-form ref="manageForm" v-model="valid" :lazy-validation="true">
      <v-container>
        <v-card style="margin-top: -65px;">
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
                    <v-img :src="setUrlImage" width="100%" height="100%" draggable="false"></v-img>
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
              <v-btn
                :disabled="!valid"
                color="error"
                class="mr-4 d-flex ml-auto"
                large
                @click="deleteItem(product)"
              >Delete</v-btn>
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 d-flex ml-auto"
                large
                @click="validate"
              >Update Product</v-btn>
            </v-card-actions>
          </v-card>
        </v-card>
      </v-container>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProductMixin from "@/mixins/ProductMixin";

@Component
export default class Manage extends ProductMixin {
  valid: boolean = false;
  dialog: boolean = true;

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      console.log(this.product);
      this.productStore.updateProduct(this.product);
    }
  }

  // Showing the product search modal when this view is mounted to views
  mounted() {
    let show: boolean;
    if (this.processStore.toManageProduct !== undefined) {
      show = false;
      this.product = JSON.parse(
        JSON.stringify(this.processStore.toManageProduct)
      );
    } else {
      show = true;
    }
    this.showSearchModal(show);
  }

  // When the view of this page is not rendered in dom it will destroy the modal and current product value
  destroyed() {
    this.processStore.setCurrentProduct(undefined);
    this.showSearchModal(false);
  }

  showSearchModal(show: boolean) {
    this.frontendStore.setSearchModal({ show });
  }
}
</script>
