<template>
  <div v-resize="matchHeight" ref="scroll" height="100%">
    <v-card color="light-blue" :max-height="height" :height="height" flat>
      <perfect-scrollbar :style="`height: ${height}px`">
        <v-row no-gutters>
          <v-col cols="12" v-for="order in orders" :key="order.product_id">
            <cashier-order-table-row :readonly="readonly" :order="order"></cashier-order-table-row>
          </v-col>
        </v-row>
      </perfect-scrollbar>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import CashierOrderTableRow from "./CashierOrderTableRow.vue";
import ContainerSizeMixin from "@/mixins/ContainerSizeMixin";
import { cashierStore } from "../../store";

@Component({
  components: { CashierOrderTableRow }
})
export default class CashierOrderTable extends ContainerSizeMixin {
  @Prop(Boolean) readonly?: boolean;
  get orders() {
    return cashierStore.getOrders;
  }
}
</script>

