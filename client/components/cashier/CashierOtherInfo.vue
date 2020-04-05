<template>
  <v-card>
    <v-card-text class="d-flex">
      <div class="d-flex flex-column mr-5">
        <div class="overline">Cashier Name</div>
        <div class="subtitle-2 font-weight-bold">Christopher Lugod</div>
      </div>
      <div class="d-flex flex-column">
        <div class="overline">Customer Name</div>
        <div class="subtitle-2 font-weight-bold">John Doe</div>
      </div>
    </v-card-text>
  </v-card>
</template> 

<script lang="ts">
import { Component } from "vue-property-decorator";
import CashierMixin from "@/mixins/CashierMixin";

@Component
export default class CashierOtherInfo extends CashierMixin {}
</script>

<style>
</style>