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
@Component({ components: { DashboardCard }, methods: { numeral } })
export default class DashBoardSales extends Vue {
  sales = {
    this_month: {
      sum: 0,
      count: "0"
    },
    last_month: {
      sum: 0,
      count: "0"
    },
    this_year: {
      sum: 0,
      count: "0"
    },
    last_year: {
      sum: 0,
      count: "0"
    }
  };

  get listSales() {
    const { this_month, last_month, this_year, last_year } = this.sales;
    return [
      {
        title: "Sales This Month",
        value: this_month.sum,
        subtitle: this_month.count,
        icon: "mdi-calendar",
        color: "primary"
      },
      {
        title: "Sales Last Month",
        value: last_month.sum,
        subtitle: last_month.count,
        icon: "mdi-calendar-arrow-left",
        color: "blue"
      },
      {
        title: "Sales This Year",
        value: this_year.sum,
        subtitle: this_year.count,
        icon: "mdi-calendar-month",
        color: "cyan"
      },
      {
        title: "Sales Last Year",
        value: last_year.sum,
        subtitle: last_year.count,
        icon: "mdi-calendar-month",
        color: "cyan"
      }
    ];
  }

  async created() {
    let statisticAPI = new StatisticAPI();
    this.sales.this_month = (
      await statisticAPI.getSales({
        timespan: "this_month"
      })
    ).data[0];
    this.sales.last_month = (
      await statisticAPI.getSales({
        timespan: "last_month"
      })
    ).data[0];
    this.sales.this_year = (
      await statisticAPI.getSales({
        timespan: "this_year"
      })
    ).data[0];
    this.sales.last_year = (
      await statisticAPI.getSales({
        timespan: "last_year"
      })
    ).data[0];
  }
}
</script>

<style>
</style>