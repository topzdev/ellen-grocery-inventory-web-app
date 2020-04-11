<template>
  <div class="d-flex flex-column" style="height: 100vh">
    <v-container v-if="cashierStore.getCustomer" class="pb-0" fluid style="flex: 1 0 auto;">
      <v-row style="height: 100%">
        <v-col class="d-flex flex-column" style="height: inherit" cols="8">
          <cashier-header></cashier-header>
          <div style="flex: 1 1 auto">
            <product-list mode="cashier" />
          </div>
          <cashier-other-info style="flex: 0 1 auto"></cashier-other-info>
        </v-col>

        <v-col cols="4" style="height: inherit">
          <v-sheet class="d-flex flex-column" min-height="100%" width="100%" elevation="4">
            <cashier-order-table style="flex: 1 0 100%"></cashier-order-table>
            <cashier-order-action style="flex: 1 1 auto"></cashier-order-action>
          </v-sheet>
        </v-col>
      </v-row>
      <cashier-payment></cashier-payment>
    </v-container>
    <v-system-bar color="primary" height="30" dark>
      <span class="overline">Transaction Hold :</span>
      &nbsp;
      <span>2</span>
      <v-spacer></v-spacer>
      <v-divider vertical></v-divider>
      <v-icon class="ml-3 mr-2">mdi-clock</v-icon>
      <span v-text="dateTime"></span>
    </v-system-bar>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import CashierOrderTable from "@/components/cashier/CashierOrderTable.vue";
import CashierOrderAction from "@/components/cashier/CashierOrderAction.vue";
import CashierOtherInfo from "@/components/cashier/CashierOtherInfo.vue";
import ProductList from "@/components/product/ProductList.vue";
import CashierPayment from "@/components/cashier/CashierPayment.vue";
import CashierHeader from "@/components/cashier/CashierHeader.vue";
import CashierMixin from "@/mixins/CashierMixin";

@Component({
  components: {
    CashierOrderTable,
    CashierOrderAction,
    CashierOtherInfo,
    ProductList,
    CashierPayment,
    CashierHeader
  }
})
export default class CashierMain extends CashierMixin {
  created() {
    // verify if customer is already asssigned
    if (!this.cashierStore.getCustomer) return this.initPage();

    // after success vetification then the transaction marked started
    console.log(this.cashierStore.getTransactionStarted);
    if (!this.cashierStore.getTransactionStarted)
      this.cashierStore.startTransaction();

    // frontend configuration for main cashier view
    this.frontendStore.setNavbar(false);
    this.frontendStore.setSidebar(true);
  }
}
</script>

