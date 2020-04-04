<template>
  <v-card color="primary" dark>
    <v-card-text style="color: #fff;">
      <div class="d-flex mb-1">
        <p class="subtitle-1">Net Price</p>
        <v-spacer />
        <h1 class="headline font-weight-bold">₱ {{calculation.net_price.toFixed(2)}}</h1>
      </div>
      <div class="d-flex mb-2">
        <p class="subtitle-1">Tax</p>
        <v-spacer />
        <h1 class="headline font-weight-bold">₱ {{calculation.tax_total.toFixed(2)}}</h1>
      </div>
      <div class="d-flex mb-2">
        <p class="subtitle-1">Grand Total</p>
        <v-spacer />
        <h1 class="display-1 font-weight-bold">₱ {{calculation.grand_total.toFixed(2)}}</h1>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="success" x-large block>Pay</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { cashierStore } from "../../store";

@Component
export default class CashierOrderAction extends Vue {
  get calculation() {
    return cashierStore.getCalculation;
  }
}
</script>

<style>
</style>