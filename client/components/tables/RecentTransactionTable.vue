<template>
  <v-card flat>
    <v-card-title class="px-0">
      <div>{{title}}</div>
      <v-spacer></v-spacer>
      <div class="body-2" style="width: 150px">
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
              <th class="text-left">Total Amount</th>
              <th class="text-left">Amount Paid</th>
              <th class="text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.customer }}</td>
              <td>{{ item.total_amount }}</td>
              <td>{{ item.amount_paid }}</td>
              <td>{{ item.date }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class RecentTransactionTable extends Vue {
  @Prop({ default: "300px" }) height: string;

  selected = 1;

  get title() {
    return `${
      this.options.filter(item => item.value === this.selected)[0].text
    } Transactions`;
  }

  options = [
    {
      value: 1,
      text: "Recent"
    },
    {
      value: 2,
      text: "Yesterday"
    },
    {
      value: 3,
      text: "This Week"
    },
    {
      value: 4,
      text: "This Month"
    }
  ];

  data = [
    {
      id: 1,
      customer: "John Doe",
      total_amount: "9,000.50",
      amount_paid: "9,020.00",
      date: "April 25, 2000"
    }
  ];
}
</script>

<style>
</style>