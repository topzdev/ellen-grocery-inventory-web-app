<template>
  <div>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click="openSidebar" />
      <v-toolbar-title v-text="title"/>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue} from "vue-property-decorator";
import { frontendStore } from "@/store";

@Component({
})
export default class Navbar extends Vue {
  title: string = "Ellen Inventory System"
  clipped: boolean = false;
  drawer: boolean = false;
  fixed: boolean = false;
  miniVariant: boolean = false;
  right: boolean = true;
  rightDrawer: boolean = false;

  public openSidebar(): void {
    console.log("Hello, World");
    frontendStore.toggleSidebar();
  }
}
</script>
