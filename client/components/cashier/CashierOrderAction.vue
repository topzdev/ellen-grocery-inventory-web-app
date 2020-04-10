<template>
  <v-card color="primary" dark>
    <v-card-text style="color: #fff;">
      <div class="d-flex mb-1">
        <p class="subtitle-1">Net Price</p>
        <v-spacer />
        <h1 class="headline font-weight-bold">₱ {{calculations.net_price.toFixed(2)}}</h1>
      </div>
      <div class="d-flex mb-2">
        <p class="subtitle-1">Tax</p>
        <v-spacer />
        <h1 class="headline font-weight-bold">₱ {{calculations.tax_total.toFixed(2)}}</h1>
      </div>
      <div class="d-flex mb-2">
        <p class="subtitle-1">Grand Total</p>
        <v-spacer />
        <h1 class="display-1 font-weight-bold">₱ {{calculations.grand_total.toFixed(2)}}</h1>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-row no-gutters>
        <!-- <v-col cols="6 mb-2 pr-2">
          <v-btn color="deep-orange darken-1" block large>
            Hold
            <v-icon right dark>mdi-pause-circle</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="6 pl-2">
          <v-btn color="cyan accent-3" block large>
            Coupon
            <v-icon right dark>mdi-ticket-percent</v-icon>
          </v-btn>
        </v-col>-->
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

@Component
export default class CashierOrderAction extends CashierMixin {}
</script>

<style>
</style>