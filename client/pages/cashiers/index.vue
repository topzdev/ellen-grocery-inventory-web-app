<template>
  <div height="100vh">
    <v-row>
      <v-col cols="8">
        <v-row>
          <v-col cols="6">
            <v-sheet>
              <v-text-field
                solo
                :hide-details="true"
                label="Search Product"
                append-icon="mdi-magnify"
              ></v-text-field>
            </v-sheet>
          </v-col>
        </v-row>

        <div style="height: 63vh">
          <product-list mode="cashier" />
        </div>
        <cashier-other-info></cashier-other-info>
      </v-col>

      <v-col cols="4">
        <v-sheet height="93.5vh" class="d-flex flex-column" width="100%" elevation="4">
          <cashier-order-table style="flex: 1 1 auto;"></cashier-order-table>
          <cashier-order-action style="height: 400px"></cashier-order-action>
        </v-sheet>
      </v-col>
    </v-row>
    <cashier-payment></cashier-payment>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import CashierOrderTable from "@/components/cashier/CashierOrderTable.vue";
import CashierOrderAction from "@/components/cashier/CashierOrderAction.vue";
import CashierOtherInfo from "@/components/cashier/CashierOtherInfo.vue";
import ProductList from "@/components/product/ProductList.vue";
import CashierPayment from "@/components/cashier/CashierPayment.vue";
import CashierMixin from "@/mixins/CashierMixin";
@Component({
  components: {
    CashierOrderTable,
    CashierOrderAction,
    CashierOtherInfo,
    ProductList,
    CashierPayment
  }
})
export default class ComponentName extends CashierMixin {}
</script>
