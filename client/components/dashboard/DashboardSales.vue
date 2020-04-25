<template>
  <v-row>
    <v-col v-for="({title, value, icon, color}, idx) in listSales" :key="idx" cols="3">
      <dashboard-card :title="title" :value="value" :icon="icon" :color="color"></dashboard-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DashboardCard from "@/components/cards/DashboardCard.vue";

@Component({ components: { DashboardCard } })
export default class DashBoardSales extends Vue {
  listSales = [
    {
      title: "Sales This Month",
      value: "₱ 10,000,000.00",
      icon: "mdi-calendar",
      color: "primary"
    },
    {
      title: "Sales Last Month",
      value: "₱ 8,589,601.00",
      icon: "mdi-calendar-arrow-left",
      color: "blue"
    },
    {
      title: "Sales This Year",
      value: "₱ 100,445,530.75",
      icon: "mdi-calendar-month",
      color: "cyan"
    }
  ];
}
</script>

<style>
</style>