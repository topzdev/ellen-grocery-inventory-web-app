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
              <th class="text-left">Points Earn</th>
              <th class="text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.transact_id">
              <td>{{ item.transact_id }}</td>
              <td>{{ item.customer_name }}</td>
              <td>{{ item.total_amount }}</td>
              <td>{{ item.amount_paid }}</td>
              <td>{{ Math.floor(item.amount_paid / 250) }}</td>
              <td>{{dayjs( item.created_at).format('MMMM DD, YYYY hh:mm:ss') }}</td>
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
import dayjs from "dayjs";

@Component({
  methods: { dayjs }
})
export default class RecentTransactionTable extends Vue {
  @Prop({ default: "300px" }) height: string;

  selected = "this_day";

  get list() {
    return statisticStore.transListByInterval;
  }

  get title() {
    return `${
      this.options.filter(item => item.value === this.selected)[0].text
    } Transactions`;
  }

  options = [
    {
      value: "this_day",
      text: "Recent"
    },
    {
      value: "last_day",
      text: "Yesterday"
    },
    {
      value: "this_week",
      text: "This Week"
    },
    {
      value: "this_month",
      text: "This Month"
    }
  ];

  @Watch("selected")
  async fetchTransactions() {
    await statisticStore.getTransactByInterval({ interval: this.selected });
  }

  created() {
    this.fetchTransactions();
  }
}
</script>

<style>
</style>