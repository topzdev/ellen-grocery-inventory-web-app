<template>
  <v-app>
    <sidebar />
    <navbar />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <snackbars />
    <modals />
  </v-app>
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Modals from "./Modals";
import Snackbars from "./Snackbars";
@Component({
  components: {
    Navbar,
    Sidebar,
    Modals,
    Snackbars
  }
})
export default class Default extends Vue {}
</script>
