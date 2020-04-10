<template>
  <div>
    <v-app-bar color="primary" :hidden="!navbar" dark :app="navbar">
      <v-app-bar-nav-icon @click="setSidebar" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { frontendStore } from "@/store";

@Component
export default class Navbar extends Vue {
  title: string = "Ellen Inventory System";

  setSidebar(show: boolean) {
    frontendStore.setSidebarMini(!this.sidebar);
  }

  get sidebar() {
    return frontendStore.sidebarMiniState;
  }

  get navbar() {
    return frontendStore.navbarState;
  }
}
</script>
