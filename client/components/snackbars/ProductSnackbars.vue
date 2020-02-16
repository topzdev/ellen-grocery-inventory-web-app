<template>
  <v-snackbar :value="snackbar.show" color="success">{{ snackbar.message }}</v-snackbar>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { frontendStore } from "@/store";
@Component
export default class SuccessSnackbars extends Vue {
  get snackbar() {
    return frontendStore.snackbarState;
  }

  @Watch("snackbar")
  closeSnackbar(val: any) {
    if (val.show) {
      setTimeout(() => frontendStore.setSnackbar({ show: false }), 6000);
    }
  }

  get snackbarColor() {
    return frontendStore.snackbarState.success ? "success" : "error";
  }
}
</script>
