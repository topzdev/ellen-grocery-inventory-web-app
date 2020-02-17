<template>
  <v-form ref="manageForm" v-model="valid" :lazy-validation="true">
    <!-- <barcode-dialog v-model="dialog" /> -->
    <v-toolbar :flat="true">
      <v-toolbar-title class="display-1 font-weight-bold">Manage Product</v-toolbar-title>
    </v-toolbar>
    <v-row class="px-3">
      <v-col cols="8">
        <v-row>
          <v-col cols="6" class="pb-0">
            <v-text-field :value="product.barcode" :rules="rules.barcode" label="Barcode" readonly />
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
              v-model="product.description"
              :value="product.description"
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
            <v-spacer />
            <v-btn
              :disabled="!valid"
              color="error"
              class="mr-4 d-flex ml-auto"
              @click="showDelete"
              large
            >Delete</v-btn>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 d-flex ml-auto"
              @click="validate"
              large
            >Update Product</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProductInfoMixins from "@/mixins/ProductInformation";
import { frontendStore, processStore, productStore } from "@/store";
@Component
export default class Manage extends ProductInfoMixins {
  valid: boolean = false;
  dialog: boolean = true;

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.productStore.updateProduct(this.product);
  }

  showDelete(): void {
    frontendStore.setDeleteModal({
      show: true,
      name: this.product.product_name
    });
    processStore.setCurrentToDelete({
      deleteFunction: productStore.deleteProduct,
      id: this.product.barcode
    });
  }

  mounted() {
    if (processStore.toManageProduct !== undefined) {
      this.product = JSON.parse(JSON.stringify(processStore.toManageProduct));
    } else {
      frontendStore.setSearchModal({ show: true });
    }
  }

  destroy() {
    frontendStore.setSearchModal({ show: false });
  }
}
</script>
