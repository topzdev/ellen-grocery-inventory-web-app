<template>
  <div>
    <v-app-bar color="primary" :hidden="!navbar" dark :app="navbar" :flat="flat">
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
    frontendStore.setSidebarMini(!this.showSidebarMini);
  }

  get showSidebar() {
    return frontendStore.showSidebar;
  }

  get showSidebarMini() {
    return frontendStore.showSidebarMini;
  }

  get flat() {
    return frontendStore.navbarFlat;
  }

  get navbar() {
    return frontendStore.showNavbar;
  }
}
</script>
