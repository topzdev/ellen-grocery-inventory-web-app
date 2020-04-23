<template>
  <div>
    <v-card-text>
      <div class="customer-search" style="width: 100%">
        <v-text-field
          solo
          label="Search Customer"
          light
          height="60px"
          rounded
          hide-details
          v-model="search"
        ></v-text-field>
      </div>
    </v-card-text>
    <v-card-text>
      <v-row>
        <v-col cols="6" v-for="item in customers" :key="item.customer_id">
          <customer-card :customer="item" :setCustomer="setCustomer"></customer-card>
        </v-col>
      </v-row>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import CustomerCard from "@/components/customer/CustomerCard.vue";
import CashierMixin from "@/mixins/CashierMixin";
import ICustomer from "../../interfaces/ICustomer";

@Component({
  components: { CustomerCard }
})
export default class CashierInitialList extends CashierMixin {
  search: string = "";
  created() {
    this.customerStore.fetchCustomers({
      limit: 6,
      transact_count: true,
      last_transact: true
    });
  }

  @Watch("search")
  searchCustomer() {
    console.log(this.search);
    this.customerStore.fetchCustomers({
      search: this.search,
      limit: 6,
      transact_count: true,
      last_transact: true
    });
  }

  setCustomer(customer: ICustomer) {
    this.cashierStore.setCustomer(customer);
    this.$router.push("/cashiers/main");
  }
}
</script>

<style>
</style>