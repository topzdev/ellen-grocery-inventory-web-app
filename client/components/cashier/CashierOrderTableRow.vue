<template>
  <tr>
    <td>{{order.name}}</td>
    <td class="text-center" style="text-align:center" width="150px">
      <cashier-quantity-input :model="order.quantity"></cashier-quantity-input>
    </td>
    <td class="text-right">₱{{order.price}}</td>
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import CashierQuantityInput from "./CashierQuantityInput.vue";
import IOrder from "@/interfaces/IOrder";

@Component({
  components: { CashierQuantityInput }
})
export default class CashierOrderTableRow extends Vue {
  @Prop(Object) order: IOrder | undefined;
}
</script>

<style scoped>
.order-card {
  display: flex;
}
</style>