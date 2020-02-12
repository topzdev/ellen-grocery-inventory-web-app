<template>
  <div>
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon />
      <v-toolbar-title>{{title}}</v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import EssentialMixins from "@/mixins/AppEssentials";
@Component({
  components: {}
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
