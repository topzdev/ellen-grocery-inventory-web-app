<template>
  <div>
    <sidebar />
    <v-app-bar :color="color" :src="background" dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Sidebar from "./Sidebar.vue";
import EssentialMixins from "@/mixins/AppEssentials";
@Component({
  components: {
    Sidebar
  }
})
export default class Navbar extends EssentialMixins {
  clipped: boolean = false;
  drawer: boolean = false;
  fixed: boolean = false;
  miniVariant: boolean = false;
  right: boolean = true;
  rightDrawer: boolean = false;
}
</script>
