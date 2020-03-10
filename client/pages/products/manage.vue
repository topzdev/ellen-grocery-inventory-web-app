<template>
  <v-form ref="manageForm" v-model="valid" :lazy-validation="true">
    <v-card flat>
      <v-card-actions>
        <back-btn title="Manage Supplier" />
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
                <v-col cols="4" class="d-flex flex-column align-center justify-start">
                  <p>Upload Product Image</p>
                  <v-avatar class="mb-2" color="grey" size="250">
                    <!-- <img :src="product.image" alt="John" draggable="false" /> -->
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
                @click="showDelete"
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
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProductInfoMixin from "@/mixins/ProductInfoMixin";

@Component
export default class Manage extends ProductInfoMixin {
  valid: boolean = false;
  dialog: boolean = true;

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      this.productStore.updateProduct(this.product);
    }
  }

  showDelete(): void {
    this.frontendStore.setDeleteModal({
      show: true,
      name: this.product.product_name
    });
    this.processStore.setCurrentToDelete({
      deleteFunction: this.productStore.deleteProduct,
      id: this.product.barcode
    });
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
    console.log(
      this.product,
      this.processStore.toManageProduct,
      " Destroyed!..."
    );
    this.showSearchModal(false);
  }

  showSearchModal(show: boolean) {
    this.frontendStore.setSearchModal({ show });
  }
}
</script>
