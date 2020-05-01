<template>
  <v-card>
    <v-simple-table fixed-header :height="height">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="item in headers" :key="item.text" :align="item.align">{{item.text}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.product_id">
            <td>{{ item.supplier_name }}</td>
            <td>{{ item.company_address }}</td>
            <td>{{ item.email_address }}</td>
            <td>{{item.tel_no}}/{{item.cp_no}}</td>
            <td>
              <div>
                <v-icon class="mr-2" @click="manageItem(item)">mdi-pencil</v-icon>
                <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SupplierMixin from "@/mixins/SupplierMixin";
import { supplierStore } from "../../store";

@Component
export default class SupplierTable extends Vue {
  search: string = "";
  headers: Array<Object> = [
    { text: "Supplier Name", align: "left" },
    { text: "Address" },
    { text: "Email Address" },
    { text: "Contact" },
    { text: "Actions" }
  ];

  get list() {
    return supplierStore.suppliers;
  }
}
</script>
