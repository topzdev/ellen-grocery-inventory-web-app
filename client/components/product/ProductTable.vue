<template>
  <v-row>
    <v-col>
      <v-card :flat="true">
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
          :items="productList"
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
        >
          <template v-slot:item.action="{ item }">
            <v-icon class="mr-2" @click="manageItem(item)">mdi-pencil</v-icon>
            <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProductMixin from "@/mixins/ProductMixin";

@Component
export default class ProductTable extends ProductMixin {
  search: string = "";
  headers: Array<Object> = [
    { text: "Account Name", align: "left", value: "product_name" },
    { text: "Barcode", value: "barcode" },
    { text: "Price", value: "price" },
    { text: "Quantity", value: "quantity" },
    { text: "Supplier", value: "supplier_name" },
    { text: "Actions", value: "action", sortable: false }
  ];

  created() {
    this.productStore.fetchProducts();
  }
}
</script>
