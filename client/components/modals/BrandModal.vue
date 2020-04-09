<template>
  <v-dialog v-model="modalState" width="500">
    <v-card :loading="loading">
      <v-toolbar :flat="true">
        <v-toolbar-title class="headline" dark primary-title v-text="brandTitle" />
        <v-spacer />
      </v-toolbar>

      <v-card-text style="max-height: 200px;">
        <v-form ref="manageForm" v-model="valid" :lazy-validation="true">
          <v-text-field
            v-model="brand.brand_name"
            :rules="rules.brand_name"
            label="Brand Name"
            required
          />
        </v-form>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-btn class="mr-4" text large @click="closeModal">Cancel</v-btn>
        <v-spacer />
        <v-btn
          :disabled="!valid"
          color="success"
          class="d-flex ml-auto"
          large
          text
          @click="validate"
        >Add Brand</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import BrandMixin from "@/mixins/BrandMixin";

@Component
export default class BrandModal extends BrandMixin {
  created() {
    this.redirect = false;
  }
}
</script>
