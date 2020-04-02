<template>
  <v-card :flat="true">
    <v-card-title>
      <div width="300px">
        <v-select v-model="selected" :items="items" hide-details></v-select>
      </div>
      <v-spacer />
      <v-text-field
        v-model="search"
        append-icon="mdi-search"
        label="Search by Product Name, Barcode, Price, Quantity, Supplier"
        hide-details
      />
    </v-card-title>
    <product-table v-if="selected === 'Product Table'" />
    <product-list v-else></product-list>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import ProductTable from "@/components/product/ProductTable.vue";
import ProductList from "@/components/product/ProductList.vue";
import { frontendStore } from "@/store";
@Component({
  components: {
    ProductTable,
    ProductList
  }
})
export default class ProductView extends Vue {
  search = "";
  items = ["Product Table", "Product List"];

  get selected() {
    return frontendStore.getProductView;
  }

  set selected(mode: string) {
    frontendStore.setProductView(mode);
  }
}
</script>

<style>
</style>