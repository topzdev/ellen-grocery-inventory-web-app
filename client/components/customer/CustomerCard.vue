<template>
  <v-card light :ripple="riffleStlye" @click="setCustomer(customer)">
    <v-card-title class="pb-2 align-center">
      <h1 class="body-1 font-weight-bold" v-text="customer.fullname"></h1>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <div class="d-flex">
            <template v-for="(item, idx) in list">
              <div v-if="item.value" :title="item.tooltip" :key="idx" class="overline mr-5">
                <div class="overline" v-text="item.title" />
                <div class="caption font-weight-medium" v-text="item.value" />
              </div>
            </template>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ICustomer from "@/interfaces/ICustomer";
import dayjs from "dayjs";

@Component
export default class CustomerCard extends Vue {
  @Prop(Object) customer!: ICustomer;
  @Prop(Function) setCustomer!: Function;

  get riffleStlye() {
    return { class: "primary--text" };
  }

  get list() {
    const { transact_count, points, last_transact } = this.customer;
    return [
      {
        title: "Points",
        value: points
      },
      {
        title: "Transactions",
        value: transact_count
      },
      {
        title: "Last Transaction",
        value: last_transact
          ? dayjs(last_transact).format("MMMM DD, YYYY")
          : false,
        tooltip: dayjs(last_transact).format("MMMM DD, YYYY @ hh:mm:ss")
      }
    ];
  }
}
</script>

<style>
</style>