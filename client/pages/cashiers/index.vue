<template>
  <v-row height="100vh">
    <v-col cols="8">Products</v-col>
    <v-col cols="4">
      <v-card height="85vh">
        <cashier-order-table></cashier-order-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierOrderTable from "@/components/cashier/CashierOrderTable.vue";
@Component({
  components: { CashierOrderTable }
})
export default class ComponentName extends Vue {}
</script>
