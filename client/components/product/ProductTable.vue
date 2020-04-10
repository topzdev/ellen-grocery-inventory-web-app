<template>
  <v-data-table
    :headers="headers"
    :items="productList"
    :items-per-page="5"
    :search="search"
    item-key="name"
    class="elevation-1"
  >
    <template v-slot:item.action="{ item }">
      <v-icon class="mr-2" @click="manageItem(item)">mdi-pencil</v-icon>
      <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import ProductMixin from "@/mixins/ProductMixin";

@Component
export default class ProductTable extends ProductMixin {
  headers: Array<Object> = [
    { text: "Account Name", align: "left", value: "product_name" },
    { text: "Barcode", value: "barcode" },
    { text: "Price", value: "price" },
    { text: "Quantity", value: "quantity" },
    { text: "Supplier", value: "supplier_name" },
    { text: "Actions", value: "action", sortable: false }
  ];

  created() {
    this.productStore.fetchProducts({ search: "" });
  }
}
</script>
