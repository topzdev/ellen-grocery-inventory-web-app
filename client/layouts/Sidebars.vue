<template>
  <div>
    <base-sidebar></base-sidebar>
    <hold-transact-sidebar></hold-transact-sidebar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import BaseSidebar from "@/components/sidebars/BaseSidebar.vue";
import HoldTransactSidebar from "@/components/sidebars/HoldTransactSidebar.vue";

@Component({
  components: { BaseSidebar, HoldTransactSidebar }
})
export default class SidebarsLayout extends Vue {}
</script>

<style>
</style>