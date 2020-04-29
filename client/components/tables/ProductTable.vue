<template>
  <v-card>
    <v-simple-table fixed-header height="400px">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="item in headers" :key="item.text" :align="item.align">{{item.text}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.product_id">
            <td>{{ item.product_name }}</td>
            <td>{{ item.barcode }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.supplier_name }}</td>
            <td>
              <div>
                <v-icon class="mr-2" @click="manageItem(item)">mdi-pencil</v-icon>
                <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { productStore } from "~/store";
import ProductCRUD from "../../mixins/ProductCRUD";

@Component
export default class ProductTable extends ProductCRUD {
  headers: Array<Object> = [
    { text: "Product Name", align: "left" },
    { text: "Barcode" },
    { text: "Price" },
    { text: "Quantity" },
    { text: "Supplier" },
    { text: "Actions" }
  ];

  get list() {
    return productStore.products;
  }
}
</script>
