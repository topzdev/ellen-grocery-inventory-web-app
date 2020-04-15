<template>
  <v-card color="primary" dark flat title>
    <v-card-text style="color: #fff;">
      <div v-for="(item, idx) in summary" :key="idx" class="d-flex mb-1">
        <p class="subtitle-1" v-text="item.title" />
        <v-spacer />
        <h1 class="headline font-weight-bold">₱ {{numeral(item.value).format('0,0.00')}}</h1>
      </div>
    </v-card-text>
    <v-card-actions v-if="!readonly">
      <v-btn color="success" x-large block @click="paymentPage">
        <v-icon>mdi-cash-register</v-icon>&nbsp;Payment
        <span class="overline">(F1)</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import CashierMixin from "@/mixins/CashierMixin";
import numeral from "numeral";

@Component({
  methods: { numeral }
})
export default class CashierOrderAction extends CashierMixin {
  @Prop(Boolean) readonly?: boolean;
  get summary() {
    return [
      {
        title: "Net Price",
        value: this.calculations.grand_total
      },
      {
        title: "Taxt",
        value: this.calculations.tax_total
      },
      {
        title: "Total Amount",
        value: this.calculations.grand_total
      }
    ];
  }
}
</script>

<style>
</style>