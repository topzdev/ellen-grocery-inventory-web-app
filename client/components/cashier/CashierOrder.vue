<template>
  <v-card class="d-flex flex-column" flat min-height="100%" width="100%" color="blue" tile dark>
    <cashier-order-table :readonly="readonly" style="flex: 1 0 100%"></cashier-order-table>
    <cashier-order-action :readonly="readonly" style="flex: 0 1 auto"></cashier-order-action>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import CashierOrderTable from "@/components/cashier/CashierOrderTable.vue";
import CashierOrderAction from "@/components/cashier/CashierOrderAction.vue";

@Component({
  components: { CashierOrderTable, CashierOrderAction }
})
export default class CashierOrder extends Vue {
  @Prop(Boolean) readonly?: boolean;
}
</script>

<style>
</style>