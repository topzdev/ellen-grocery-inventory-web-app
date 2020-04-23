<template>
  <v-card light elevation="5">
    <v-card-title class="d-flex align-center pb-1">
      <h1 class="title mr-2" title="Customer Name">{{transaction.customer_name}}</h1>
      <div class="subtitle-1" title="Transaction Number">#{{transaction.transact_id}}</div>
      <v-spacer></v-spacer>
      <div class="caption" :title="time.exact" v-text="time.suffixed"></div>
    </v-card-title>

    <v-card-text class="d-flex">
      <div class="d-flex flex-column mr-5">
        <div class="overline">Total Amount</div>
        <div class="subtitle-2">₱ {{transaction.total_amount.toFixed(2)}}</div>
      </div>

      <div class="d-flex flex-column">
        <div class="overline">Amount Paid</div>
        <div class="subtitle-2">₱ {{transaction.amount_paid.toFixed(2)}}</div>
      </div>
      <v-spacer></v-spacer>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ITransaction from "@/interfaces/ITransaction";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

@Component
export default class CashierRecentTransactionsCard extends Vue {
  @Prop(Object) transaction!: ITransaction;

  get time() {
    dayjs.extend(relativeTime);
    return {
      suffixed: dayjs(this.transaction.created_at).fromNow(),
      exact: dayjs(this.transaction.created_at).format("MMMM DD, YYYY h:mm:ss")
    };
  }
}
</script>

<style>
</style>