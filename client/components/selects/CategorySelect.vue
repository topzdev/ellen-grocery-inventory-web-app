<template>
  <v-select
    v-bind="$attrs"
    :items="category"
    item-value="category_id"
    item-text="category_name"
    label="Category"
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
