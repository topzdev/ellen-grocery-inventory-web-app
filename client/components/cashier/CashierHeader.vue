<template>
  <v-row style="flex: 0">
    <v-col cols="6">
      <v-sheet>
        <v-text-field
          rounded
          filled
          :hide-details="true"
          append-icon="mdi-magnify"
          placeholder="Search Product by Name or Barcode"
          v-model="search"
        ></v-text-field>
      </v-sheet>
    </v-col>

    <v-col>
      <div class="d-flex">
        <v-spacer></v-spacer>
        <div v-if="customer" class="text-right mr-3">
          <div class="title-1 text-right font-weight-bold" v-text="customer.fullname || ''" />
          <div>Points: {{customer.points || ''}}</div>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import CashierMixin from "@/mixins/CashierMixin";

@Component
export default class ComponentName extends CashierMixin {
  search: string = "";

  @Watch("search")
  searchProduct() {
    console.log(this.search);
    this.productStore.fetchProducts({
      search: this.search,
      show_deleted: false
    });
  }

  get customer() {
    return this.cashierStore.customer;
  }
}
</script>

<style>
</style>