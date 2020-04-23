<template>
  <v-dialog v-model="showModal" persistent width="500">
    <v-card class="d-flex flex-column text-center justify-center align-center pt-4">
      <template v-if="!manual">
        <img height="200" width="200" src="~/assets/img/barcode-scan.gif" draggable="false" />

        <v-text-field v-model="barcode" label="Barcode" required append-icon="mdi-barcode-scan" />

        <v-card-title class="headline">Scan the Barcode Using Scanner</v-card-title>
      </template>

      <template v-else>
        <v-row>
          <v-col class="d-flex align-center justify-center" cols="12">
            <v-text-field v-model="barcode" label="Barcode" required :hide-details="true" large />
            <v-btn color="primary" @click="searchBarcode">Verify</v-btn>
          </v-col>
        </v-row>

        <v-card-title class="headline">Manually type the barcode</v-card-title>
      </template>

      <v-card-text>The process continue when barcode is verified</v-card-text>

      <v-card-actions>
        <v-btn text @click="backPage">Back</v-btn>
        <v-spacer />
        <v-btn color="green darken-1" @click="manual = !manual" text>
          {{
          !manual ? 'Manual': 'Scanner'}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { frontendStore, productStore } from "@/store";
@Component
export default class BarcodeDialog extends Vue {
  manual: Boolean = true;
  barcode: string = "";
  autofocus: boolean = true;

  get searched() {
    return productStore.singleProduct;
  }

  get showModal() {
    return frontendStore.showBarcodeModal;
  }

  // @Watch("searched")
  // verifyBarcode() {
  //   if (this.searched !== null) {
  //     return frontendStore.setSnackbar({
  //       show: true,
  //       message: "The Barcode you entering is already existing",
  //       success: false
  //     });
  //   }
  //   frontendStore.setBarcodeModal(false);
  // }

  searchBarcode() {
    if (this.barcode === "") {
      return frontendStore.setSnackbar({
        show: true,
        message: "Please enter barcode",
        success: false
      });
    }
    productStore.fetchSingleProduct(this.barcode);
  }

  backPage() {
    frontendStore.setBarcodeModal(false);
    this.$router.push("/products");
  }
}
</script>

<style scoped>
</style>
