<template>
  <v-simple-table dense :fixed-header="true" height="400">
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-center" width="150px">Quantity</th>
          <th class="text-right">Price</th>
        </tr>
      </thead>

      <tbody>
        <cashier-order-table-row v-for="order in orders" :key="order.product_id" :order="order"></cashier-order-table-row>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierOrderTableRow from "./CashierOrderTableRow.vue";
import { cashierStore } from "../../store";

@Component({
  components: { CashierOrderTableRow }
})
export default class CashierOrderTable extends Vue {
  get orders() {
    return cashierStore.getOrders;
  }
}
</script>

