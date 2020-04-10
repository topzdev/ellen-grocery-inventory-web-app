<template>
  <v-card color="primary" dark>
    <v-card-text style="color: #fff;">
      <div v-for="(item, idx) in summary" :key="idx" class="d-flex mb-1">
        <p class="subtitle-1" v-text="item.title" />
        <v-spacer />
        <h1 class="headline font-weight-bold">₱ {{numeral(item.value).format('0,0.00')}}</h1>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn color="success" x-large block @click="openPaymentTray(true)">Pay</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierMixin from "@/mixins/CashierMixin";
import numeral from "numeral";

@Component({
  methods: { numeral }
})
export default class CashierOrderAction extends CashierMixin {
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