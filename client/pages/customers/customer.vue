<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn />
      <v-toolbar-title class="pl-2">Manage Account</v-toolbar-title>
    </v-toolbar>

    <v-container>
      <v-row style="margin-top: -60px;">
        <v-col cols="7">
          <customer-form
            ref="form"
            :validate="validate"
            :data="customer"
            :isEdit="isEdit"
            :title="customerTitle"
            :rules="rules"
            :isLoading="isLoading"
            :closeModal="closeModal"
          ></customer-form>
        </v-col>
        <v-col cols="5">
          <other-list
            title="Customer"
            :delete-item="deleteCustomer"
            :search-item="searchCustomer"
            :list-item="customerList"
            :set-item="setCustomer"
            item-name="fullname"
            item-id="customer_id"
            two-line="email_address"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import { Component } from "vue-property-decorator";
import CustomerMixin from "@/mixins/CustomerMixin";
import CustomerTable from "@/components/customer/CustomerTable.vue";
import CustomerForm from "@/components/forms/CustomerForm.vue";
import OtherList from "@/components/list/OtherList.vue";
@Component({
  components: { CustomerTable, CustomerForm, OtherList }
})
export default class AddCustomer extends CustomerMixin {}
</script>

<style></style>
