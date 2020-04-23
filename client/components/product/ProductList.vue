<template>
  <v-row>
    <template v-for="(item, idx) in productList">
      <v-col cols="4" v-if="!isOutOfStock(item.quantity)" :key="idx">
        <product-card :mode="mode" :item="item"></product-card>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import ProductMixin from "@/mixins/ProductMixin";
import ProductCard from "./ProductCard.vue";
@Component({
  components: {
    ProductCard
  }
})
export default class ProductList extends ProductMixin {
  @Prop(String) mode: string | undefined;
  created() {
    this.productStore.fetchProducts({ search: "" });
  }

  isOutOfStock(quantity: number) {
    if (this.mode === "cashier" && quantity <= 0) return true;
    return false;
  }
}
</script>

<style>
</style>