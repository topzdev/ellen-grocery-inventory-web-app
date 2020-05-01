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
    <v-list-item class="px-2 pt-2" @click="setSidebarMini(!sidebarMini)">
      <v-list-item-content>
        <v-list-item-title class="title">{{$auth.user.firstname+' '+$auth.user.lastname}}</v-list-item-title>
        <v-list-item-subtitle>{{$auth.user.role_name}}</v-list-item-subtitle>
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
import { Component, Vue } from "vue-property-decorator";
import { frontendStore } from "@/store";

@Component
export default class Sidebar extends Vue {
  drawer: boolean = true;
  right: boolean = false;
  expandOnHover: boolean = true;
  items: Array<Object> = [
    { title: "Homes", icon: "mdi-storefront", to: "/dashboard" },
    { title: "Cashier", icon: "mdi-cash-register", to: "/cashiers" },
    { title: "Product", icon: "mdi-basket-fill", to: "/products" },
    { title: "Addons", icon: "mdi-decagram", to: "/others" },
    { title: "Customers", icon: "mdi-account", to: "/customers" },
    { title: "Account", icon: "mdi-account-group-outline", to: "/accounts" }
  ];

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
