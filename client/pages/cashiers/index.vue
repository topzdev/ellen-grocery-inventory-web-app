<template>
  <div height="100vh">
    <v-row>
      <v-col class="d-flex flex-column" cols="8">
        <v-row style="flex: 0">
          <v-col cols="6">
            <v-sheet>
              <v-text-field
                solo
                :hide-details="true"
                label="Search Product"
                append-icon="mdi-magnify"
                v-model="search"
              ></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>

        <div style="flex: 1 1 auto">
          <product-list mode="cashier" />
        </div>
        <cashier-other-info style="flex: 0 1 auto"></cashier-other-info>
      </v-col>

      <v-col cols="4">
        <v-sheet height="93.5vh" class="d-flex flex-column" width="100%" elevation="4">
          <cashier-order-table style="flex: 1 1 auto;"></cashier-order-table>
          <cashier-order-action style="flex: 0 1 auto"></cashier-order-action>
        </v-sheet>
      </v-col>
    </v-row>
    <cashier-initial></cashier-initial>
    <cashier-payment></cashier-payment>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import CashierOrderTable from "@/components/cashier/CashierOrderTable.vue";
import CashierOrderAction from "@/components/cashier/CashierOrderAction.vue";
import CashierOtherInfo from "@/components/cashier/CashierOtherInfo.vue";
import ProductList from "@/components/product/ProductList.vue";
import CashierInitial from "@/components/cashier/CashierInitial.vue";
import CashierPayment from "@/components/cashier/CashierPayment.vue";
import CashierMixin from "@/mixins/CashierMixin";
@Component({
  components: {
    CashierOrderTable,
    CashierOrderAction,
    CashierOtherInfo,
    ProductList,
    CashierPayment,
    CashierInitial
  }
})
export default class ComponentName extends CashierMixin {}
</script>
