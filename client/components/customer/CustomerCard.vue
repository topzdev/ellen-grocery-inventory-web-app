<template>
  <v-card light :ripple="riffleStlye">
    <v-card-title class="pb-2 align-center">
      <v-avatar color="grey lighten-2 mr-2" size="30">
        <v-img></v-img>
      </v-avatar>
      <h1 class="title" v-text="customer.fullname"></h1>
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col>
          <div class="d-flex">
            <div class="overline">
              <div class="overline">Points</div>
              <div class="caption font-weight-medium">10</div>
            </div>
            <v-spacer></v-spacer>
            <div class="overline">
              <div class="overline">Transactions</div>
              <div class="caption font-weight-medium">5</div>
            </div>
            <v-spacer></v-spacer>
            <div>
              <div class="overline">Last Transaction</div>
              <div class="caption font-weight-medium">May 10 2019</div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ICustomer from "@/interfaces/ICustomer";

@Component
export default class CustomerCard extends Vue {
  @Prop(Object) customer!: ICustomer;

  get riffleStlye() {
    return { class: "primary--text" };
  }
}
</script>

<style>
</style>