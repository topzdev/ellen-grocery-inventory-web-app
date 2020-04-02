<template>
  <tr>
    <td>Bear Brand Chocolate</td>
    <td class="text-center d-flex align-center" style="text-align:center" width="150px">
      <cashier-quantity-input></cashier-quantity-input>
    </td>
    <td class="text-right">₱500</td>
  </tr>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierQuantityInput from "./CashierQuantityInput.vue";

@Component({
  components: { CashierQuantityInput }
})
export default class CashierOrderTableRow extends Vue {}
</script>

<style>
</style>