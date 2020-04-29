<template>
  <v-row>
    <template v-for="(item, idx) in list">
      <v-col cols="4" v-if="!isOutOfStock(item.quantity)" :key="idx">
        <cashier-product-card :item="item"></cashier-product-card>
      </v-col>
    </template>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CashierProductCard from "@/components/cards/CashierProductCard.vue";
import ProductMixin from "@/mixins/ProductMixin";
import { productStore } from "../../store";
@Component({
  components: {
    CashierProductCard
  }
})
export default class ProductList extends Vue {
  isOutOfStock(quantity: number) {
    return quantity <= 0 ? true : false;
  }
  get list() {
    return productStore.products;
  }
}
</script>

<style>
</style>