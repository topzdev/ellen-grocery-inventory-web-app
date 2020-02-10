<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          Product Table
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-search"
            label="Search by Product Name, Barcode, Price, Quantity, Supplier"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="products"
          :items-per-page="5"
          :search="search"
          item-key="name"
          class="elevation-1"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
          }"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { productStore } from "@/store";
@Component
export default class ProductTable extends Vue {
  search: string = "";
  headers: Array<Object> = [
    { text: "Product Name", align: "left", value: "product_name" },
    { text: "Barcode", value: "barcode" },
    { text: "Price", value: "price" },
    { text: "Quantity", value: "quantity" },
    { text: "Supplier", value: "supplier_name" }
  ];

  get products() {
    return productStore.getProduct;
  }

  public created() {
    productStore.fetchProducts();
  }
}
</script>
