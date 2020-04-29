<template>
  <v-card flat>
    <v-card-title class="d-flex align-center px-0">
      <div class="title">Top Customers</div>
      <v-spacer></v-spacer>
      <div class="body-2" style="width: 120px">
        <v-select
          :hide-details="true"
          dense
          :items="options"
          item-text="text"
          item-value="value"
          v-model="selected"
        ></v-select>
      </div>
    </v-card-title>
    <v-card>
      <v-simple-table fixed-header :height="height">
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ID</th>
              <th class="text-left">Customer</th>
              <th class="text-left">Spend</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.customer_id">
              <td>{{ item.customer_id }}</td>
              <td>{{ item.fullname }}</td>
              <td>{{ item.spend }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { statisticStore } from "../../store";

@Component
export default class RecentTransactionTable extends Vue {
  @Prop({ default: "300px" }) height: string;

  selected = "this_day";

  options = [
    {
      value: "this_day",
      text: "Today"
    },
    {
      value: "this_year",
      text: "This Year"
    },
    {
      value: "this_month",
      text: "This Month"
    },
    {
      value: "last_month",
      text: "Last Month"
    }
  ];

  get list() {
    return statisticStore.customerListByInterval;
  }

  @Watch("selected")
  async fetchCustomer() {
    await statisticStore.getCustomersByInterval({ interval: this.selected });
  }

  created() {
    console.log(this.selected);
    this.fetchCustomer();
  }
}
</script>

<style></style>
