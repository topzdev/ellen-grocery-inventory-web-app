<template>
  <v-speed-dial
    v-model="fab"
    :bottom="true"
    :right="true"
    direction="top"
    transition="slide-x-reverse-transition"
    :fixed="true"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="white primary--text" dark fab large>
        <v-icon v-if="fab">mdi-cog</v-icon>
        <v-icon v-else>mdi-cog-outline</v-icon>
      </v-btn>
    </template>
    <v-btn
      v-for="(item, idx) in fabList"
      :key="idx"
      fab
      dark
      :color="item.color"
      @click="item.action"
    >
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-badge :content="item.content" :value="item.content" color="red">
            <v-icon v-on="on">{{item.icon}}</v-icon>
          </v-badge>
        </template>
        <span>{{item.tooltip}}</span>
      </v-tooltip>
    </v-btn>
  </v-speed-dial>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { frontendStore, cashierStore } from "../../store";

@Component
export default class CashierSpeedDial extends Vue {
  fab = false;

  get fabList() {
    return [
      {
        title: "",
        icon: "mdi-account-plus-outline",
        color: "success",
        tooltip: "Add Account",
        action: () => frontendStore.setCustomerModal(true),
        content: false
      },
      {
        title: "",
        icon: "mdi-pause-circle-outline",
        color: "warning",
        tooltip: "Hold Transactions",
        action: () => frontendStore.setHoldSidebar(true),
        content: cashierStore.hold.length
      }
    ];
  }
}
</script>

<style>
.v-speed-dial--right {
  right: 15px;
}

.v-speed-dial--bottom {
  bottom: 40px;
}
</style>