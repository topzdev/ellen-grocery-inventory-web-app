<template>
  <v-row>
    <v-col>
      <v-card :flat="true">
        <v-card-title>
          Supplier Table
          <v-spacer />
          <v-text-field
            v-model="search"
            append-icon="mdi-search"
            label="Search by Supplier Name, Address, Contact and Email Address"
            single-line
            hide-details
          />
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items-per-page="5"
          :items="suppliersData"
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
            <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import SupplierInfoMixins from "@/mixins/SupplierInfoMixin";

@Component
export default class SupplierTable extends SupplierInfoMixins {
  search: string = "";
  headers: Array<Object> = [
    { text: "Supplier Name", align: "left", value: "supplier_name" },
    { text: "Address", value: "company_address" },
    { text: "Email Address", value: "email_address" },
    { text: "Contact", value: "cp_no" },
    { text: "Actions", value: "action", sortable: false }
  ];

  get suppliersData() {
    return this.supplierStore.getSupplier;
  }
}
</script>
