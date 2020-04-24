<template>
  <v-card light>
    <v-card @click="show = !show" tile flat style="user-select: none;">
      <v-card-title>
        <div>
          <div class="overline">Customer Name</div>
          <div class="title">{{info.customer}}</div>
        </div>
      </v-card-title>
      <v-card-subtitle class="caption black--text">
        Holded at:
        <span class="black--text font-weight-medium">{{info.holded_date}}</span>
      </v-card-subtitle>
    </v-card>

    <v-scroll-y-reverse-transition>
      <v-card-text class="grey lighten-4" v-if="show">
        <v-row>
          <v-col v-for="(item, idx) in info.list" :key="idx" :cols="item.width">
            <div class="d-flex flex-column">
              <div class="overline">{{item.label}}</div>
              <div class="subtitle-2">{{item.value}}</div>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-scroll-y-reverse-transition>
    <div :color="show ? 'grey lighten-1': ''">
      <v-card-actions>
        <v-btn text small color="error" @click="deleteTransact">Delete</v-btn>
        <v-spacer></v-spacer>
        <v-btn text small color="primary" @click="validateTransact">Continue</v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { frontendStore, cashierStore } from "@/store";
import { IHoldTransact } from "@/interfaces";
import numeral from "numeral";
import dayjs from "dayjs";

@Component
export default class HoldTransactCard extends Vue {
  @Prop(Object) holdInfo: IHoldTransact;
  @Prop(Number) index: number;

  show = false;

  get info() {
    const {
      holded_at,
      customer,
      account,
      total_amount,
      quantity_count,
      transaction_started
    } = this.holdInfo;

    console.log(total_amount, quantity_count);

    return {
      customer: customer.fullname,
      holded_date: dayjs(holded_at).format("MMMM DD, YYYY - hh:mm:ss a"),
      list: [
        {
          label: "Total Amount",
          value: "₱ " + numeral(total_amount).format("0,0.00"),
          width: 5
        },
        {
          label: "Quantity",
          value: quantity_count,
          width: 4
        },
        {
          label: "Length",
          value: dayjs(holded_at).diff(transaction_started, "minute") + " min",
          width: 3
        },
        {
          label: "Cashier Name",
          value: account.fullname,
          width: 8
        }
      ]
    };
  }

  validateTransact() {
    let index = this.index;

    if (cashierStore.transaction_started && cashierStore.customer) {
      return frontendStore.setMessageModal({
        title: "Warning! Currently at active transaction.",
        message:
          "Do you want to cancel this transaction before continuing the hold transaction?",
        show: true,
        mode: "question",
        yesFunction: () => {
          cashierStore.retriveHold(index);
          frontendStore.setHoldSidebar(false);
        }
      });
    }

    this.continueTransact();
  }

  continueTransact() {
    let index = this.index;

    frontendStore.setMessageModal({
      title: "Continue Hold Transaction?",
      show: true,
      message: `The total amount may change 
      depend on product price and avaiable quantity `,
      mode: "question",
      yesFunction: () => {
        cashierStore.retriveHold(index);
        frontendStore.setHoldSidebar(false);
      }
    });
  }

  deleteTransact() {
    let index = this.index;
    frontendStore.setMessageModal({
      title: "Delete Transaction",
      show: true,
      message: `Are you sure to delete this hold transaction?`,
      mode: "question",
      yesFunction: () => {
        cashierStore.removeHold(index);
        frontendStore.setHoldSidebar(false);
      }
    });
  }
}
</script>

<style>
</style>