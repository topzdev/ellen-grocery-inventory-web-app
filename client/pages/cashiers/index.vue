<template>
  <v-row height="100vh">
    <v-col cols="8">
      <v-row></v-row>

      <product-list mode="cashier" />
    </v-col>

    <v-col cols="4">
      <v-sheet height="85vh" width="100%" elevation="1">
        <cashier-order-table></cashier-order-table>
        <cashier-order-action></cashier-order-action>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierOrderTable from "@/components/cashier/CashierOrderTable.vue";
import CashierOrderAction from "@/components/cashier/CashierOrderAction.vue";
import ProductList from "@/components/product/ProductList.vue";
@Component({
  components: { CashierOrderTable, CashierOrderAction, ProductList }
})
export default class ComponentName extends Vue {}
</script>
