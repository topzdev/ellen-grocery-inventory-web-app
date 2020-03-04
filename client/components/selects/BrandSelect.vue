<template>
  <v-select
    v-bind="$attrs"
    :items="brands"
    item-value="brand_id"
    item-text="brand_name"
    label="Brand"
    :value="value"
    @change="input"
  />
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import SelectMixin from "@/mixins/SelectMixin";

@Component
export default class BrandSelect extends SelectMixin {}
</script>
