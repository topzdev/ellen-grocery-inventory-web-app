<template>
  <v-row>
    <v-col>
      <v-card :flat="true">
        <v-card-title>
          Account Table
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-search"
            label="Search by Account Username or ID"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="accountList"
          :items-per-page="5"
          :search="search"
          item-key="name"
          class="elevation-1"
          :footer-props="{
            showFirstLastPage: true,
            firstIcon: 'mdi-arrow-collapse-left',
            lastIcon: 'mdi-arrow-collapse-right',
            prevIcon: 'mdi-minus',
            nextIcon: 'mdi-plus'
          }"
        >
          <template v-slot:item.action="{ item }">
            <v-icon class="mr-2" @click="manageItem(item)">mdi-pencil</v-icon>
            <v-icon @click="showDelete(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AccountMixin from "@/mixins/AccountMixin";

@Component
export default class AccountTable extends AccountMixin {
  search: string = "";
  headers: Array<Object> = [
    { text: "Account ID", align: "left", value: "account_id" },
    { text: "Fullname", value: "fullname" },
    { text: "Username", value: "username" },
    { text: "Role", value: "role_name" },
    { text: "Actions", value: "action", sortable: false }
  ];

  created() {
    this.accountStore.fetchAccounts({});
  }
}
</script>
