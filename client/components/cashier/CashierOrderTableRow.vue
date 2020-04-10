<template>
  <tr>
    <td>
      <div class="subtitle-2 d-inline-block text-truncate">{{order.name}}</div>
      <div v-text="price" />
    </td>
    <td class="text-center" style="text-align:center" width="120px">
      <cashier-quantity-input :value="order.quantity" :input="input"></cashier-quantity-input>
    </td>
    <td class="text-right" v-text="totalPrice" />
  </tr>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import CashierQuantityInput from "./CashierQuantityInput.vue";
import IOrder from "@/interfaces/IOrder";
import { cashierStore } from "../../store";
import numeral from "numeral";

@Component({
  components: { CashierQuantityInput }
})
export default class CashierOrderTableRow extends Vue {
  @Prop(Object) order!: IOrder;

  input(quantity: number) {
    console.log(quantity);
    cashierStore.updateOrder({ ...this.order, quantity });
  }

  get totalPrice() {
    return `₱ ${numeral(this.order.quantity * this.order.price).format(
      "0,0.00"
    )} `;
  }

  get price() {
    return `₱ ${numeral(this.order.price).format("0,0.00")}`;
  }
}
</script>

<style scoped>
.order-card {
  display: flex;
}
</style>