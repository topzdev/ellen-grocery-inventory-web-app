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

@Component({ components: { DashboardCard } })
export default class DashboardProducts extends Vue {
  listProduct = [
    {
      title: "Products",
      value: "543",
      icon: "mdi-basket-fill",
      color: "purple "
    },
    {
      title: "Customers",
      value: "102",
      icon: "mdi-account",
      color: "brown"
    },
    {
      title: "Transactions",
      value: "80,324",
      icon: "mdi-receipt",
      color: "success"
    },
    {
      title: "Critical",
      value: "5",
      icon: "mdi-shield-alert",
      color: "orange"
    },
    {
      title: "Out of Stocks",
      value: "5",
      icon: "mdi-alert-octagram",
      color: "error"
    }
  ];
}
</script>

<style>
.col-20 {
  flex: 0 0 20%;
  max-width: 20%;
}
</style>