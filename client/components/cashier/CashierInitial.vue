<template>
  <v-dialog v-model="show" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card color="primary" dark tile max-width="100vw">
      <v-container fluid style="height: 100vh">
        <v-row no-gutters>
          <v-col cols="12">
            <v-card-title>
              <h1 class="display-2 font-weight-bold text-uppercase">Ellen Inventory System</h1>
              <v-spacer></v-spacer>
              <h1 class="title" v-text="dateTime"></h1>
            </v-card-title>
          </v-col>
          <v-col cols="9">
            <v-card-text>
              <div class="customer-search" style="width: 700px;">
                <v-text-field
                  class="mr-3"
                  solo
                  label="Search Customer"
                  light
                  height="60px"
                  rounded
                  hide-details
                ></v-text-field>
                <v-btn fab color="success" large>
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-col>
          <v-col cols="3">
            <h1 class="overline font-weight-bold">Recent Transaction</h1>
            <v-row>
              <v-col cols="12">
                <v-card light elevation="5">
                  <v-card-title class="d-flex align-center">
                    <h1 class="title mr-2" title="Customer Name">Chirstopher Lugod</h1>
                    <div class="subtitle-1" title="Transaction Number">#025</div>
                    <v-spacer></v-spacer>
                    <p class="caption" title="5:59 pm">9 hrs ago</p>
                  </v-card-title>

                  <v-card-text class="d-flex">
                    <div class="d-flex flex-column">
                      <div class="overline">Grand Total</div>
                      <div class="subtitle-2">₱ 18,000.00</div>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="d-flex flex-column">
                      <div class="overline">Quantity</div>
                      <div class="subtitle-2">180</div>
                    </div>
                    <v-spacer></v-spacer>
                    <div class="d-flex flex-column">
                      <div class="overline">Grand Total</div>
                      <div class="subtitle-2">₱ 18,000.00</div>
                    </div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierMixin from "@/mixins/CashierMixin";

@Component
export default class CashierInitital extends CashierMixin {
  show = true;
}
</script>

<style>
.customer-search {
  display: flex;
  align-items: center;
}
</style>