<template>
  <cashier-speed-dial></cashier-speed-dial>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CashierSpeedDial from "@/components/cashier/CashierSpeedDial.vue";

@Component({
  components: { CashierSpeedDial }
})
export default class SpeedDial extends Vue {}
</script>

<style>
</style>