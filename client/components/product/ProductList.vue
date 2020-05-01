<template>
  <v-row>
    <template v-for="(item, idx) in list">
      <v-col cols="3" :key="idx">
        <product-card :item="item"></product-card>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import ProductCard from "@/components/cards/ProductCard.vue";
import ProductMixin from "@/mixins/ProductMixin";
import { productStore } from "../../store";
@Component({
  components: {
    ProductCard
  }
})
export default class ProductList extends Vue {
  page = 1;
  get list() {
    return productStore.products;
  }
}
</script>

<style>
</style>