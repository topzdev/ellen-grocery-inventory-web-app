<template>
  <v-app>
    <sidebar />
    <navbar />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

@Component({
  components: {
    Navbar,
    Sidebar
  }
})
export default class Default extends Vue {}
</script>
