<template>
  <v-select
    v-bind="$attrs"
    :items="roles"
    item-value="role_id"
    item-text="role_name"
    label="Role"
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
