<template>
  <v-sheet class="primary" height="100%" tile flat>
    <v-card cols="12" v-for="control in controls" :key="control.key" color="transparent" flat>
      <v-card-actions>
        <v-btn class="control-btn" :color="control.color" @click="control.action">
          <v-icon class="mb-1">{{control.icon}}</v-icon>
          <div style="width: 100%; text-transform: capitalize;">
            <div class="font-weight-medium">{{control.title}}</div>
            <div>({{control.key}})</div>
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
  controls = [
    {
      title: "Hold",
      key: "F2",
      action: () => console.log("Hello"),
      color: "warning",
      icon: "mdi-pause-circle-outline"
    },

    {
      title: "Gift Cards",
      key: "F3",
      action: this.cancelTransaction,
      color: "yellow",
      icon: "mdi-wallet-giftcard"
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
  word-break: break-all;
  width: 100%;
}
</style>