<template>
  <v-card flat>
    <v-card-title>
      <v-text-field
        style="max-width: 500px"
        filled
        rounded
        dense
        v-model="search"
        placeholder="Search Product"
        hide-details
        @input="fetchCustomer"
      />
      <v-spacer></v-spacer>
      <v-select
        class="mr-4"
        v-model="row"
        :items="rows"
        label="Rows"
        style="max-width: 150px"
        @input="fetchCustomer"
      ></v-select>
    </v-card-title>
    <v-card-text>
      <customer-table></customer-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div>Results {{this.row}} out of {{this.count}}</div>
      <v-pagination
        v-model="page"
        :length="length"
        @input="fetchCustomer"
        :total-visible="10"
        style="width: auto;"
      ></v-pagination>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CustomerTable from "@/components/tables/CustomerTable.vue";
import { customerStore } from "../../store";
import CustomerViewMixin from "@/mixins/CustomerViewMixin";

@Component
export default class CustomerView extends CustomerViewMixin {}
</script>

<style>
</style>