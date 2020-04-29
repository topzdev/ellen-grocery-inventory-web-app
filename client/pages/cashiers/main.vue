<template>
  <keypress key-event="keyup" @pressed="shortcut">
    <form class="d-flex flex-column" style="height: 100vh" @keypress.capture="shortcut">
      <v-row style="height: 100%" no-gutters>
        <v-col cols="5" style="height: inherit">
          <v-row no-gutters style="height: inherit">
            <v-col style="height: inherit" cols="2">
              <cashier-controls></cashier-controls>
            </v-col>
            <v-col style="height: inherit">
              <cashier-order></cashier-order>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="d-flex flex-column px-5" style="height: inherit">
          <cashier-header></cashier-header>
          <div style="flex: 1 1 auto">
            <cashier-product-list />
          </div>
        </v-col>
      </v-row>
      <cashier-system-bar></cashier-system-bar>
    </form>
  </keypress>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import CashierProductList from "@/components/cashier/CashierProductList.vue";
import CashierOtherInfo from "@/components/cashier/CashierOtherInfo.vue";
import CashierOrder from "@/components/cashier/CashierOrder.vue";
import CashierHeader from "@/components/cashier/CashierHeader.vue";
import CashierSystemBar from "@/components/cashier/CashierSystemBar.vue";
import CashierControls from "@/components/cashier/CashierControls.vue";
import CashierMixin from "@/mixins/CashierMixin";
import Keypress from "@/components/misc/Keypress.vue";

@Component({
  components: {
    CashierOrder,
    CashierOtherInfo,
    CashierProductList,
    CashierHeader,
    CashierSystemBar,
    CashierControls,
    Keypress
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
    if (!this.cashierStore.customer) return this.initPage();

    // after success vetification then the transaction marked started
    if (!this.cashierStore.transaction_started)
      this.cashierStore.startTransaction();

    // frontend configuration for main cashier view
    this.frontendStore.setNavbar(false);
    this.frontendStore.setSidebar(true);
  }

  shortcut(event: any) {
    console.log(event);
  }
}
</script>

