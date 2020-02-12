<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    :right="right"
    :expand-on-hover="true"
    color="primary"
    dark
    app
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <img src="https://randomuser.me/api/portraits/men/81.jpg" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="title">Christopher Lugod</v-list-item-title>
        <v-list-item-subtitle>Administrator</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-list :nav="true" shaped>
      <v-list-item v-for="item in items" :key="item.title" :nuxt="true" :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import EssentialsMixins from "@/mixins/AppEssentials";

@Component
export default class Sidebar extends EssentialsMixins {
  drawer: boolean = true;
  mini: boolean = true;
  right: boolean = false;
  expandOnHover: boolean = true;
  items: Array<Object> = [
    { title: "Home", icon: "mdi-storefront", to: "d" },
    { title: "Products", icon: "mdi-shopping-search", to: "/product" },
    { title: "Manage Product", icon: "mdi-basket-fill", to: "/manage" },
    {
      title: "Suppliers",
      icon: "mdi-truck",
      to: "/suppliers"
    },
    {
      title: "Customers",
      icon: "mdi-account",
      to: "/customers"
    },
    { title: "Account", icon: "mdi-account-group-outline", to: "/account" }
  ];
}
</script>
