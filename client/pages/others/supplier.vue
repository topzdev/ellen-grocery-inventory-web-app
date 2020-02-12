<template>
  <v-form ref="addForm" :lazy-validation="true">
    <v-toolbar :color="''" :flat="true">
      <v-toolbar-title class="display-1 font-weight-bold">Supplier</v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>
    <v-row class="px-4">
      <v-col cols="8">
        <v-row>
          <v-col cols="6" class="pb-0">
            <v-text-field label="Suppliers Name" required />
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field label="Cellphone Number" required />
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field label="Telephone Number" required />
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field label="Email Address" required />
          </v-col>
          <v-col cols="12" class="pb-0">
            <v-text-field label="Company Address" required />
          </v-col>
          <v-col cols="12">
            <v-textarea :auto-grow="true" label="Description" />
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-divider />
        <v-row>
          <v-col class="d-flex">
            <v-btn class="mr-4" large>Cancel</v-btn>
            <v-btn :disabled="!valid" color="success" class="mr-4 d-flex ml-auto" large>Add Supplier</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class supplier extends Vue {}
</script>
