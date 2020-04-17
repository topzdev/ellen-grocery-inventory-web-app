<template>
  <v-row style="height: 100vh" no-gutters>
    <v-col cols="4">
      <cashier-order :readonly="true"></cashier-order>
    </v-col>
    <v-col cols="8">
      <v-card height="100vh">
        <v-container>
          <v-row>
            <v-col cols></v-col>
            <v-col cols="9" class="align-center">
              <div class="overline mb-3" style="font-size: 14px !important;">Amount Tendered</div>
              <v-card color="grey lighten-4" elevation="1">
                <v-card-text class="text-center">
                  <div class="display-3 font-weight-bold primary--text" v-text="amountTendered" />
                </v-card-text>
              </v-card>
              <v-card class="mt-5" flat tile color="transparent">
                <v-row>
                  <v-col>
                    <div class="overline mb-3" style="font-size: 14px !important;">Amount Paid</div>
                    <v-text-field flat filled rounded class="display-1" v-model.number="amountPaid"></v-text-field>
                  </v-col>
                  <v-col cols="auto">
                    <div class="overline mb-3" style="font-size: 14px !important;">&nbsp;</div>
                    <v-icon x-large>mdi-swap-horizontal</v-icon>
                  </v-col>
                  <v-col>
                    <div class="overline mb-3" style="font-size: 14px !important;">Change</div>
                    <v-text-field
                      flat
                      filled
                      rounded
                      class="display-1"
                      :value="changeAmount"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
              <v-card class="mt-5" flat tile color="transparent">
                <div class="overline mb-3" style="font-size: 14px !important;">Quick Cash Payment</div>
                <v-row>
                  <v-col v-for="(item, idx) in quickCash" :key="idx" cols class="pt-0">
                    <v-btn
                      x-large
                      :color="item.color"
                      dark
                      block
                      @click="amountPaid = item.amount"
                    >{{item.title}}</v-btn>
                  </v-col>
                </v-row>
              </v-card>
              <v-card class="mt-5" flat tile color="transparent">
                <v-row>
                  <v-col cols="4">
                    <v-btn x-large block @click="mainPage">Cancel</v-btn>
                  </v-col>
                  <v-col cols="8">
                    <v-btn x-large color="success" block @click="checkout">Finish</v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols></v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierOrder from "@/components/cashier/CashierOrder.vue";
import CashierMixin from "../../mixins/CashierMixin";
import numeral from "numeral";

@Component({
  components: { CashierOrder }
})
export default class CashierPaymentPage extends CashierMixin {
  amountPaid: number = 0.0;
  change: number = 0.0;

  checkout() {
    this.cashierStore.finishTransaction({ amount_paid: this.amountPaid });
  }

  mounted() {
    if (!this.cashierStore.getCustomer) {
      this.frontendStore.setSnackbar({
        show: true,
        message: "Please choose customer first"
      });
      return this.initPage();
    }
    if (!this.cashierStore.getCalculation.quantity_total) {
      this.frontendStore.setSnackbar({
        show: true,
        message: "Please add something on your cart"
      });
      return this.mainPage();
    }
  }

  get quickCash() {
    return [
      {
        amount: this.calculations.grand_total,
        title: "Exact",
        color: "primary"
      },
      { amount: 100, title: "₱ 100" },
      { amount: 200, title: "₱ 200" },
      { amount: 500, title: "₱ 500" },
      { amount: 1000, title: "₱ 1000" }
    ];
  }

  get amountTendered() {
    return "₱ " + numeral(this.calculations.grand_total).format("0,0.00");
  }

  get changeAmount() {
    if (!this.amountPaid) return "₱ 0.00";
    this.change = this.amountPaid - this.calculations.grand_total;
    return "₱ " + numeral(this.change).format("0,0.00");
  }
}
</script>

<style scoped>
.v-text-field input {
  font-size: 3em;
}
</style>