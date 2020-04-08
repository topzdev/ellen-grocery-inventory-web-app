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
          <cashier-recent-transactions></cashier-recent-transactions>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierMixin from "@/mixins/CashierMixin";
import CashierRecentTransactions from "@/components/cashier/CashierRecentTransactions.vue";

@Component({
  components: { CashierRecentTransactions }
})
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