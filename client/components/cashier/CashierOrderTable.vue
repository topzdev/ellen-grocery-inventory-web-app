<template>
  <div v-resize="matchHeight" ref="orderTable" height="100%">
    <v-card color="light-blue" :max-height="height" :height="height">
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
import { Vue, Component, Prop } from "vue-property-decorator";
import CashierOrderTableRow from "./CashierOrderTableRow.vue";
import { cashierStore } from "../../store";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";

@Component({
  components: { CashierOrderTableRow, PerfectScrollbar }
})
export default class CashierOrderTable extends Vue {
  @Prop(Boolean) readonly?: boolean;

  height = 0;
  get orders() {
    return cashierStore.getOrders;
  }
  mounted() {
    this.matchHeight();
  }
  matchHeight() {
    // @ts-ignore;
    this.height = this.$refs.orderTable.clientHeight;
    console.log(this.height);
  }
}
</script>

<style src="vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css"/>
