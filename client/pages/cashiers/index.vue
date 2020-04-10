<template>
  <v-card color="primary" dark tile max-width="100vw" height="100vh">
    <v-container style="height: 100%">
      <v-row no-gutters style="height: 100%">
        <v-col cols="8">
          <v-card-title>
            <div class="display-1 font-weight-bold text-uppercase">Ellen's Point of Sales</div>
          </v-card-title>
          <v-card-text class="d-flex pd-0">
            <div class="subtitle-1" v-text="dateTime"></div>
            <v-spacer></v-spacer>
            <div class="subtitle-1">Cashier: Christopher Lugod</div>
          </v-card-text>
          <cashier-initital-list></cashier-initital-list>
        </v-col>
        <v-col cols="4" height="100%">
          <cashier-recent-transactions></cashier-recent-transactions>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierMixin from "@/mixins/CashierMixin";
import CashierRecentTransactions from "@/components/cashier/CashierRecentTransactions.vue";
import CashierInititalList from "@/components/cashier/CashierInitialList.vue";

@Component({
  components: { CashierRecentTransactions, CashierInititalList }
})
export default class CashierInitital extends CashierMixin {
  show = true;
}
</script>

<style>
.customer-search {
  display: flex;
  align-items: center;
}
</style>