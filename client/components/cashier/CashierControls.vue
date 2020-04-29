<template>
  <v-sheet class="primary d-flex flex-column flex-end" height="100%" tile flat>
    <v-spacer></v-spacer>
    <v-card cols="12" v-for="control in controls" :key="control.key" color="transparent" flat>
      <v-card-actions>
        <v-btn
          class="control-btn"
          :color="control.color"
          :disabled="control.disabled"
          @click="control.action"
        >
          <v-icon class="mb-1">{{control.icon}}</v-icon>
          <div style="width: 100%; text-transform: capitalize;">
            <div style="white-space: normal;" class="font-weight-medium">
              {{control.title}}
              <span>({{control.key}})</span>
            </div>
          </div>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierMixin from "@/mixins/CashierMixin";

@Component
export default class CashierControls extends CashierMixin {
  get controls() {
    return [
      {
        title: "Settings",
        action: this.cancelTransaction,
        color: "white primary--text",
        key: "F5",
        icon: "mdi-cog"
      },
      {
        title: "Change Customer",
        action: this.changeCustomer,
        color: "purple white--text",
        key: "F4",
        icon: "mdi-account-edit"
      },
      {
        title: "Gift Cards",
        key: "F3",
        action: this.cancelTransaction,
        color: "yellow",
        icon: "mdi-wallet-giftcard"
      },
      {
        title: "Hold",
        key: "F2",
        action: this.holdTransaction,
        color: "warning",
        icon: "mdi-pause-circle-outline",
        disabled: this.cashierStore.orders.length ? false : true
      },
      {
        title: "Cancel",
        key: "Esc",
        action: this.cancelTransaction,
        color: "error",
        icon: "mdi-cancel"
      }
    ];
  }
}
</script>

<style>
.control-btn {
  height: auto !important;
  min-height: 75px;
  text-transform: capitalize;
  width: 100%;
}

.control-btn .v-btn__content {
  display: flex !important;
  padding: 10px 0;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  font-size: 10px;
  line-height: 1.2;
  width: 100%;
}
</style>