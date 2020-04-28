<template>
  <v-row>
    <v-col v-for="({title, value, icon, color}, idx) in listProduct" :key="idx" class="col col-20">
      <dashboard-card :small="true" :title="title" :value="value" :icon="icon" :color="color"></dashboard-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DashboardCard from "@/components/cards/DashboardCard.vue";
import { statisticStore } from "../../store";

@Component({ components: { DashboardCard } })
export default class DashboardProducts extends Vue {
  get listProduct() {
    const { productStatus, count } = statisticStore;
    if (productStatus && count) {
      const { product, transaction, customer } = count;
      const { out_of_stock, critical } = productStatus;
      return [
        {
          title: "Products",
          value: product,
          icon: "mdi-basket-fill",
          color: "purple "
        },
        {
          title: "Customers",
          value: customer,
          icon: "mdi-account",
          color: "brown"
        },
        {
          title: "Transactions",
          value: transaction,
          icon: "mdi-receipt",
          color: "success"
        },
        {
          title: "Critical",
          value: critical,
          icon: "mdi-shield-alert",
          color: "orange"
        },
        {
          title: "Out of Stocks",
          value: out_of_stock,
          icon: "mdi-alert-octagram",
          color: "error"
        }
      ];
    }
  }

  async created() {
    await statisticStore.getCountOverall();
    await statisticStore.getProductStatus();
  }
}
</script>

<style>
.col-20 {
  flex: 0 0 20%;
  max-width: 20%;
}
</style>