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
              <th class="text-left">Product Name</th>
              <th class="text-left">Barcode</th>
              <th class="text-left">Qty</th>
              <th class="text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.id">
              <td>{{ item.product_name }}</td>
              <td>{{ item.barcode }}</td>
              <td>{{ item.quantity }}</td>
              <td>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </td>
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
    } Products`;
  }

  options = [
    {
      value: 1,
      text: "Out of stocks"
    },
    {
      value: 2,
      text: "Critical"
    },
    {
      value: 3,
      text: "Overflow"
    }
  ];

  data = [
    {
      product_name: "Hansel Choco",
      barcode: "22323238209832",
      quantity: "0"
    }
  ];
}
</script>

<style>
</style>