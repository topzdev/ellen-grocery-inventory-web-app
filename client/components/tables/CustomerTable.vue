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
          <tr v-for="item in list" :key="item.customer_ud">
            <td>{{ item.fullname }}</td>
            <td>{{ item.home_address }}</td>
            <td>{{ item.email_address }}</td>
            <td>{{ item.points }}</td>
            <td>{{ item.transact_count }}</td>
            <td>{{ item.last_transact }}</td>
            <td>
              <div>
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
import { Component, Vue, Prop } from "vue-property-decorator";
import { customerStore, frontendStore } from "@/store";
import { ICustomer } from "@/interfaces";
import CustomerViewMixin from "@/mixins/CustomerViewMixin";

@Component
export default class CustomerTable extends Vue {
  @Prop({ default: "300px" }) height: string;
  headers: Array<Object> = [
    { text: "Full Name" },
    { text: "Home Address" },
    { text: "Email Address" },
    { text: "Points" },
    { text: "Transactions" },
    { text: "Last Transaction" },
    { text: "Actions" }
  ];

  get list() {
    return customerStore.customers;
  }

  deleteCustomer(item: ICustomer) {
    frontendStore.setMessageModal({
      title: "Delete Customer",
      show: true,
      message: `Are you sure to delete this product ${item.fullname}?`,
      mode: "question",
      yesFunction: () => {
        customerStore.deleteCustomer(item.customer_id);
      }
    });
  }
}
</script>
