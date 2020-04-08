<template>
  <v-col cols="3">
    <h1 class="overline font-weight-bold">Recent Transaction</h1>
    <v-row>
      <v-col cols="12" v-for="item in transactions" :key="item.transact_id">
        <cashier-recent-transactions-card :transaction="item" />
      </v-col>
    </v-row>
  </v-col>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierRecentTransactionsCard from "./CashierRecentTransactionsCard.vue";
import CashierMixin from "../../mixins/CashierMixin";
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