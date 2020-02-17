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
import { Vue, Component } from "vue-property-decorator";
import { productStore, frontendStore, processStore } from "@/store";
import IProductInfo from "@/interfaces/productInfoInterface";
@Component
export default class ProductTable extends Vue {
  search: string = "";
  headers: Array<Object> = [
    { text: "Product Name", align: "left", value: "product_name" },
    { text: "Barcode", value: "barcode" },
    { text: "Price", value: "price" },
    { text: "Quantity", value: "quantity" },
    { text: "Supplier", value: "supplier_name" },
    { text: "Actions", value: "action", sortable: false }
  ];

  get products() {
    return productStore.getProducts;
  }

  created() {
    productStore.fetchProducts();
  }

  manageItem(item: IProductInfo) {
    processStore.setCurrentProduct(item);
    this.$router.push("products/manage");
  }

  deleteItem(item: IProductInfo) {
    console.log(item.barcode);

    // showing the dialog
    frontendStore.setDeleteModal({ show: true, name: item.product_name });

    // Assigning what delete function to be process
    processStore.setCurrentToDelete({
      deleteFunction: productStore.deleteProduct,
      id: item.barcode
    });
  }
}
</script>
