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
        @input="fetchAccounts"
      />
      <v-spacer></v-spacer>

      <v-select
        class="mr-4"
        v-model="row"
        :items="rows"
        label="Rows"
        style="max-width: 150px"
        @input="fetchAccounts"
      ></v-select>
    </v-card-title>
    <v-card-text>
      <account-table></account-table>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <div>Results {{this.row}} out of {{this.count}}</div>
      <v-pagination
        v-model="page"
        :length="length"
        @input="fetchAccounts"
        :total-visible="10"
        style="width: auto;"
      ></v-pagination>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AccountViewMixin from "@/mixins/AccountViewMixin";

@Component
export default class AccountView extends AccountViewMixin {}
</script>

<style>
</style>