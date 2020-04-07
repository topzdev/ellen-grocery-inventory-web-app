<template>
  <v-row>
    <v-col v-for="(item, idx) in productList" :key="idx" cols="4">
      <product-card :mode="mode" :item="item"></product-card>
    </v-col>
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
}
</script>

<style>
</style>