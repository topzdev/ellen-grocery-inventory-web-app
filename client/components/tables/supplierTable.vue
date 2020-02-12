<template>
  <v-row>
    <v-col>
      <v-card flat="true">
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
          :items="products"
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
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class SupplierTable extends Vue {
  search: string = "";
  headers: Array<Object> = [
    { text: "Supplier Name", align: "left", value: "supplier_name" },
    { text: "Address", value: "address" },
    { text: "Email Address", value: "email" },
    { text: "Contact", value: "contact" }
  ];
}
</script>
