<template>
  <div>
    <v-card-text>
      <div class="customer-search" style="width: 700px;">
        <v-text-field
          class="mr-3"
          solo
          label="Search Customer"
          light
          height="60px"
          rounded
          hide-details
          v-model="search"
        ></v-text-field>
        <v-btn fab color="success" large @click="openCustomerModal(true)">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </div>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="6" v-for="item in customers" :key="item.customer_id">
          <customer-card :customer="item"></customer-card>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import CustomerCard from "@/components/customer/CustomerCard.vue";
import CashierMixin from "@/mixins/CashierMixin";

@Component({
  components: { CustomerCard }
})
export default class CashierInitialList extends CashierMixin {
  search: string = "";
  created() {
    this.customerStore.fetchCustomers({ search: this.search });
  }

  @Watch("search")
  searchCustomer() {
    console.log(this.search);
    this.customerStore.fetchCustomers({ search: this.search });
  }
}
</script>

<style>
</style>