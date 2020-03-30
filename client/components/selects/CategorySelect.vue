<template>
  <v-select
    v-bind="$attrs"
    :items="category"
    item-value="category_id"
    item-text="category_name"
    label="Category"
    :value="value"
    @change="input"
  >
     <template v-slot:prepend-item>
      <v-list-item ripple dense @click="openModal('Category')"> 
        <v-list-item-content>
          <v-list-item-title>Add More Category All</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import SelectMixin from "@/mixins/SelectMixin";

@Component
export default class BrandSelect extends SelectMixin {}
</script>
