<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    :color="color"
    :expand-on-hover="expandOnHover"
    :right="right"
    :src="background"
    absolute
    dark
  >
    <v-list-item class="px-2 py-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg" />
      </v-list-item-avatar>

      <v-list-item-title>John Leider</v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider />

    <v-list :nav="true" rounded>
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
    { title: "Account", icon: "mdi-account-group-outline", to: "/account" }
  ];
}
</script>
