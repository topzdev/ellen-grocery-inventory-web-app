<template>
  <v-card flat>
    <v-card-title>
      <v-text-field
        style="max-width: 500px"
        filled
        rounded
        dense
        v-model="search"
        placeholder="Search Product"
        hide-details
      />
      <v-spacer></v-spacer>

      <v-btn-toggle v-model="selected" color="primary" dense group>
        <v-btn v-for="item in views" :key="item.value" :value="item.value" text>
          <v-icon>{{item.icon}}</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-title>
    <v-card-text>
      <product-table v-if="selected === 'table'" />
      <product-list v-else></product-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import ProductViewMixin from "../../mixins/ProductViewMixin";
import { frontendStore } from "@/store";

export default class ProductView extends ProductViewMixin {}
</script>

<style>
</style>