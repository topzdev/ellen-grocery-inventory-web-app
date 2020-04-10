<template>
  <v-card color="blue lighten-1" elevation="0" height="100%">
    <v-card-text>
      <h1 class="overline font-weight-bold">Recent Transaction</h1>
      <v-row>
        <v-col cols="12" v-for="item in transactions" :key="item.transact_id">
          <cashier-recent-transactions-card :transaction="item" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierRecentTransactionsCard from "./CashierRecentTransactionsCard.vue";
import CashierMixin from "../../mixins/CashierMixin";
import IAccount from "../../interfaces/IAccount";
import ICustomer from "../../interfaces/ICustomer";
@Component({
  components: { CashierRecentTransactionsCard }
})
export default class CashierRecentTransactions extends CashierMixin {
  created() {
    this.transactionStore.fetchTransactions({});
  }
}
</script>

<style>
</style>