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
            <tr v-for="item in data" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.customer }}</td>
              <td>{{ item.spend }}</td>
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

  options = [
    {
      value: 1,
      text: "Overall"
    },
    {
      value: 2,
      text: "This Year"
    },
    {
      value: 3,
      text: "This Month"
    },
    {
      value: 4,
      text: "Last Month"
    }
  ];

  data = [
    {
      id: 1,
      customer: "John Doe",
      spend: "109,000.50"
    },
    {
      id: 2,
      customer: "Mary Doe",
      spend: "99,540.50"
    }
  ];
}
</script>

<style></style>
