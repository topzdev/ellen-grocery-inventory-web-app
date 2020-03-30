<template>
  <v-select
    v-bind="$attrs"
    :items="suppliers"
    item-value="supplier_id"
    item-text="supplier_name"
    label="Supplier"
    :value="value"
    @change="input"
  >

   <template v-slot:prepend-item>
      <v-list-item ripple dense @click="openModal('Supplier')"> 
        <v-list-item-content>
          <v-list-item-title>Add More Supplier All</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import SelectMixin from "@/mixins/SelectMixin";

@Component({ inheritAttrs: false })
export default class SupplierSelect extends SelectMixin {}
</script>
