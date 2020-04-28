<template>
  <v-row>
    <v-col v-for="({title, value, icon, color, subtitle}, idx) in listSales" :key="idx" cols="3">
      <dashboard-card
        :title="title"
        :subtitle="'Over ' + subtitle + ' Transactions'"
        :value="'₱'+ numeral(value).format('0,0.00')"
        :icon="icon"
        :color="color"
      ></dashboard-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DashboardCard from "@/components/cards/DashboardCard.vue";
import StatisticAPI from "@/api/Statistic";
import numeral from "numeral";
import { statisticStore } from "../../store";
@Component({ components: { DashboardCard }, methods: { numeral } })
export default class DashBoardSales extends Vue {
  get listSales() {
    if (statisticStore.sales) {
      const {
        this_month,
        last_month,
        this_year,
        last_year
      } = statisticStore.sales;
      return [
        {
          title: "Sales This Month",
          value: this_month.sum || 0,
          subtitle: this_month.count || 0,
          icon: "mdi-calendar",
          color: "primary"
        },
        {
          title: "Sales Last Month",
          value: last_month.sum || 0,
          subtitle: last_month.count || 0,
          icon: "mdi-calendar-arrow-left",
          color: "blue"
        },
        {
          title: "Sales This Year",
          value: this_year.sum || 0,
          subtitle: this_year.count || 0,
          icon: "mdi-calendar-month",
          color: "cyan"
        },
        {
          title: "Sales Last Year",
          value: last_year.sum || 0,
          subtitle: last_year.count || 0,
          icon: "mdi-calendar-month",
          color: "cyan"
        }
      ];
    }
  }

  async created() {
    await statisticStore.getSales();
  }
}
</script>

<style>
</style>