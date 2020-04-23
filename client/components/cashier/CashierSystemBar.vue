<template>
  <v-system-bar color="primary" height="30" dark>
    <span class="overline">Cashier :</span>
    &nbsp;
    <span>John Doe</span>
    <v-spacer></v-spacer>
    <span class="overline">Transaction Hold :</span>
    &nbsp;
    <span>2</span>
    &nbsp;
    &nbsp;
    <v-divider vertical></v-divider>
    <v-icon class="ml-3 mr-2">mdi-clock</v-icon>
    <span v-text="dateTime"></span>
  </v-system-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierMixin from "@/mixins/CashierMixin";

@Component
export default class CashierSystemBar extends CashierMixin {}
</script>

<style>
</style>