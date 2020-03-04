<template>
  <v-select
    v-bind="$attrs"
    :items="suppliers"
    item-value="supplier_id"
    item-text="supplier_name"
    label="Supplier"
    :value="value"
    @change="input"
  />
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import SelectMixin from "@/mixins/SelectMixin";

@Component({ inheritAttrs: false })
export default class SupplierSelect extends SelectMixin {}
</script>
