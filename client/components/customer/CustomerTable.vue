<template>
  <v-row>
    <v-col>
      <v-card :flat="true">
        <v-card-title>
          Customer Table
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-search"
            label="Search by Customer ID and Full Name"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="customerList"
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
import CustomerMixin from "@/mixins/CustomerMixin";

@Component
export default class CustomerTable extends CustomerMixin {
  search: string = "";
  headers: Array<Object> = [
    { text: "Customer ID", align: "left", value: "customer_id" },
    { text: "Full Name", value: "fullname" },
    { text: "Points", value: "points" },
    { text: "Home Address", value: "home_address" },
    { text: "Email Address", value: "email_adress" },
    { text: "Actions", value: "action", sortable: false }
  ];

  created() {
    this.customerStore.fetchCustomers();
  }
}
</script>
