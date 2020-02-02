<template>
  <v-dialog persistent width="500">
    <v-card class="d-flex flex-column text-center justify-center align-center pt-4">
      <template v-if="!manual">
        <img height="200" width="200" src="~/assets/img/barcode-scan.gif" draggable="false" />
        <v-text-field
          v-model="barcode"
          label="Barcode"
          required
          append-icon="mdi-barcode-scan"
          :autofocus="true"
        />
        <v-card-title class="headline">Scan the Barcode Using Scanner</v-card-title>
      </template>
      <template v-else>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="barcode"
              label="Barcode"
              required
              append-icon="mdi-barcode-scan"
              large
            />
          </v-col>
        </v-row>
        <v-card-title class="headline">Manually type the barcode</v-card-title>
      </template>
      <v-card-text>The process continue when barcode is verified</v-card-text>
      <v-card-actions>
        <v-btn text @click="dialog = false">Back</v-btn>
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
import { Vue, Component, Prop } from "vue-property-decorator";
@Component({
  inheritAttrs: false
})
export default class BarcodeDialog extends Vue {
  // @Prop({ type: Boolean, default: false }) dialog: boolean | undefined;
  public manual: Boolean = false;
  public barcode: string = "";
}
</script>

<style scoped>
</style>
