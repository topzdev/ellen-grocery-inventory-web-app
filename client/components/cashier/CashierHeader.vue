<template>
  <v-row style="flex: 0">
    <v-col cols="6">
      <v-sheet>
        <v-text-field
          solo
          :hide-details="true"
          label="Search Product"
          append-icon="mdi-magnify"
          v-model="search"
        ></v-text-field>
      </v-sheet>
    </v-col>

    <v-col>
      <div class="d-flex align-center">
        <v-spacer></v-spacer>
        <div class="text-right">
          <div class="subtitle-1 text-right font-weight-bold" v-text="fullname" />
          <v-btn text x-small style="text-decoration: underline">Change Customer</v-btn>
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
    this.productStore.fetchProducts({ search: this.search });
  }

  get fullname() {
    return this.cashierStore.getCustomer?.fullname;
  }
}
</script>

<style>
</style>