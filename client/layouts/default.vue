<template>
  <v-app>
    <sidebar />
    <navbar />
    <v-content>
      <nuxt />
    </v-content>
    <snackbars />
    <modals />
    <speed-dial />
  </v-app>
</template>
<script>
import { Vue, Component } from "vue-property-decorator";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Modals from "./Modals";
import Snackbars from "./Snackbars";
import SpeedDial from "./SpeedDial";

@Component({
  components: {
    Navbar,
    Sidebar,
    Modals,
    Snackbars,
    SpeedDial
  }
})
export default class Default extends Vue {
  head() {
    return {
      title: "Hello World",
      htmlAttrs: {
        style: "overflow: hidden !important;"
      }
    };
  }
}
</script>
