<template>
  <v-card color="blue lighten-1" flat height="100%">
    <v-card-text style="height: 100%">
      <h1 class="overline font-weight-bold">Recent Transaction</h1>
      <perfect-scrollbar :style="`height: 90vh;`" :options="{suppressScrollX : true}">
        <v-row>
          <v-col cols="12" class="pb-0" v-for="item in transactions" :key="item.transact_id">
            <cashier-recent-transactions-card :transaction="item" />
          </v-col>
        </v-row>
      </perfect-scrollbar>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import CashierRecentTransactionsCard from "./CashierRecentTransactionsCard.vue";
import CashierMixin from "../../mixins/CashierMixin";
import IAccount from "../../interfaces/IAccount";
import ICustomer from "../../interfaces/ICustomer";
@Component({
  components: { CashierRecentTransactionsCard }
})
export default class CashierRecentTransactions extends CashierMixin {
  created() {
    this.transactionStore.fetchTransactions({
      recent: true,
      order_by: "ended_at",
      order: "DESC"
    });
  }
}
</script>

<style>
.ps {
  height: 100vh;
}
</style>