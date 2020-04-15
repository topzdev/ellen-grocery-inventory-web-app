<template>
  <div class="d-flex flex-column" style="height: 100vh">
    <v-row style="height: 100%" no-gutters>
      <v-col cols="4" style="height: inherit">
        <cashier-order></cashier-order>
      </v-col>
      <v-col class="d-flex flex-column px-5" style="height: inherit" cols="8">
        <cashier-header></cashier-header>
        <div style="flex: 1 1 auto">
          <product-list mode="cashier" />
        </div>
        <cashier-other-info style="flex: 0 1 auto"></cashier-other-info>
      </v-col>
    </v-row>
    <cashier-system-bar></cashier-system-bar>
  </div>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import ProductList from "@/components/product/ProductList.vue";
import CashierOtherInfo from "@/components/cashier/CashierOtherInfo.vue";
import CashierOrder from "@/components/cashier/CashierOrder.vue";
import CashierHeader from "@/components/cashier/CashierHeader.vue";
import CashierSystemBar from "@/components/cashier/CashierSystemBar.vue";
import CashierMixin from "@/mixins/CashierMixin";

@Component({
  components: {
    CashierOrder,
    CashierOtherInfo,
    ProductList,
    CashierHeader,
    CashierSystemBar
  },
  head: {
    title: "Hello World",
    htmlAttrs: {
      style: "overflow: hidden !important;"
    }
  }
})
export default class CashierMain extends CashierMixin {
  created() {
    // verify if customer is already asssigned
    if (!this.cashierStore.getCustomer) return this.initPage();

    // after success vetification then the transaction marked started
    if (!this.cashierStore.getTransactionStarted)
      this.cashierStore.startTransaction();

    // frontend configuration for main cashier view
    this.frontendStore.setNavbar(false);
    this.frontendStore.setSidebar(true);
  }
}
</script>

