<template>
  <v-navigation-drawer
    v-if="$auth.loggedIn"
    v-model="sidebar"
    :mini-variant="sidebarMini"
    :right="right"
    color="primary"
    dark
    app
  >
    <v-list-item class="px-2 pt-2">
      <v-app-bar-nav-icon @click="setSidebarMini(true)" />
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
import { Component, Vue } from "vue-property-decorator";
import { frontendStore } from "@/store";

@Component
export default class Sidebar extends Vue {
  drawer: boolean = true;
  right: boolean = false;
  expandOnHover: boolean = true;
  get items() {
    let route = [];

    const dashboard = {
        title: "Homes",
        icon: "mdi-storefront",
        to: "/dashboard"
      },
      cashier = {
        title: "Cashier",
        icon: "mdi-cash-register",
        to: "/cashiers"
      },
      product = {
        title: "Product",
        icon: "mdi-basket-fill",
        to: "/products"
      },
      customer = {
        title: "Customers",
        icon: "mdi-account",
        to: "/customers"
      },
      account = {
        title: "Account",
        icon: "mdi-account-group-outline",
        to: "/accounts"
      },
      addons = { title: "Addons", icon: "mdi-decagram", to: "/others" };

    const {
      user: { role_name },
      loggedIn
    } = this.$auth;

    console.log(role_name, loggedIn);

    if (loggedIn) {
      switch (role_name.toLowerCase()) {
        case "administrator":
          route.push(dashboard, account);
          break;

        case "inventory":
          route.push(product, addons);
          break;

        case "cashier":
          route.push(cashier);
          break;
      }
    }

    return route;
  }
  get sidebar() {
    return frontendStore.showSidebar;
  }
  set sidebar(show: boolean) {
    frontendStore.setSidebar(show);
  }

  get sidebarMini() {
    return frontendStore.showSidebarMini;
  }
  set sidebarMini(show: boolean) {
    frontendStore.setSidebarMini(show);
  }

  setSidebarMini(show: boolean) {
    frontendStore.setSidebarMini(show);
  }
}
</script>
