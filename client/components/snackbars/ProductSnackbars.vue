<template>
  <v-snackbar :value="snackbar.show" :color="snackbarColor">{{ snackbar.message }}</v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { frontendStore } from "@/store";
@Component
export default class SuccessSnackbars extends Vue {
  get snackbar() {
    return frontendStore.showSnackbar;
  }

  @Watch("snackbar")
  closeSnackbar(val: any) {
    if (val.show) {
      setTimeout(() => frontendStore.setSnackbar({ show: false }), 6000);
    }
  }

  get snackbarColor() {
    return this.snackbar.success ? "success" : "error";
  }

  get snackbarShow() {
    return this.snackbar.show !== undefined ? this.snackbar.show : true;
  }
}
</script>
