<template>
  <div>
    <v-card tile flat color="grey lighten-5">
      <v-container fluid>
        <v-card-title>
          <div class="display-1 font-weight-bold">Dashboard</div>
        </v-card-title>

        <v-card-text>
          <dashboard-sales></dashboard-sales>
        </v-card-text>
      </v-container>
    </v-card>
    <v-card flat tile>
      <v-card-text>
        <v-container fluid>
          <dashboard-products></dashboard-products>

          <v-row>
            <v-col cols="7">
              <recent-transaction-table></recent-transaction-table>
            </v-col>
            <v-col cols="5">
              <critical-product-table></critical-product-table>
            </v-col>
            <v-col cols="3">
              <top-customer-table></top-customer-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DashboardSales from "@/components/dashboard/DashboardSales.vue";
import DashboardProducts from "@/components/dashboard/DashboardProducts.vue";
import RecentTransactionTable from "@/components/tables/RecentTransactionTable.vue";
import CriticalProductTable from "@/components/tables/CriticalProductTable.vue";
import TopCustomerTable from "@/components/tables/TopCustomerTable.vue";

@Component({
  components: {
    DashboardSales,
    DashboardProducts,
    RecentTransactionTable,
    CriticalProductTable,
    TopCustomerTable
  }
})
export default class DashboardPage extends Vue {}
</script>

