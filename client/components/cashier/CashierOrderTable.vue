<template>
  <div v-resize="matchHeight" ref="orderTable" height="100%">
    <v-simple-table dense :fixed-header="true" :height="height">
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-center" width="120px">Quantity</th>
            <th class="text-right">Price</th>
          </tr>
        </thead>

        <tbody>
          <cashier-order-table-row v-for="order in orders" :key="order.product_id" :order="order"></cashier-order-table-row>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierOrderTableRow from "./CashierOrderTableRow.vue";
import { cashierStore } from "../../store";

@Component({
  components: { CashierOrderTableRow }
})
export default class CashierOrderTable extends Vue {
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
  }
}
</script>

