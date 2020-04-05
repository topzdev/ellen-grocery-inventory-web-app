<template>
  <v-dialog
    v-model="paymentTrayState"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-btn icon dark @click="openPaymentTray(false)">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Payment</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="dialog = false">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <div style="height: 80vh">
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <div class="d-flex mb-1">
                  <p class="title">Net Price</p>
                  <v-spacer />
                  <h1 class="display-1 font-weight-bold">₱ {{calculations.net_price.toFixed(2)}}</h1>
                </div>
                <div class="d-flex mb-2">
                  <p class="title">Tax</p>
                  <v-spacer />
                  <h1 class="display-1 font-weight-bold">₱ {{calculations.tax_total.toFixed(2)}}</h1>
                </div>
                <div class="d-flex mb-2">
                  <p class="title">Grand Total</p>
                  <v-spacer />
                  <h1 class="display-2 font-weight-bold">₱ {{calculations.grand_total.toFixed(2)}}</h1>
                </div>
              </v-col>
              <v-col cols="6"></v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import CashierMxin from "@/mixins/CashierMixin";
import { cashierStore } from "@/store";

@Component
export default class CashierPayment extends CashierMxin {
  dialog = true;
}
</script>

<style>
</style>