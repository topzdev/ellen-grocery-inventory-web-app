<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-center" width="150px">Quantity</th>
          <th class="text-right">Price</th>
        </tr>
      </thead>

      <tbody>
        <cashier-order-table-row></cashier-order-table-row>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierOrderTablerRow from "./CashierOrderTableRow.vue";

@Component({
  components: { CashierOrderTablerRow }
})
export default class CashierOrderTable extends Vue {}
</script>

