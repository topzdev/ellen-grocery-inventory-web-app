<template>
  <div>
    <v-app-bar color="primary" :hidden="hidden" dark :app="app">
      <v-app-bar-nav-icon @click="openSidebar" />
      <v-toolbar-title v-text="title" />
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { frontendStore } from "@/store";

@Component({})
export default class Navbar extends Vue {
  title: string = "Ellen Inventory System";
  clipped: boolean = false;
  drawer: boolean = false;
  fixed: boolean = false;
  miniVariant: boolean = false;
  right: boolean = true;
  rightDrawer: boolean = false;
  hidden: boolean = false;
  app: boolean = true;

  public openSidebar(): void {
    console.log("Hello, World");
    frontendStore.toggleSidebar();
  }

  mounted() {
    console.log(this.$route.path);
    if (this.$route.path.includes("/cashier")) {
      this.hidden = true;
      this.app = false;
    }
  }
}
</script>
