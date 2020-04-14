<template>
  <v-form ref="form" lazy-validation @submit.prevent="validate">
    <v-card :loading="isLoading">
      <v-toolbar flat>
        <v-toolbar-title v-text="title" />
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-text-field
              v-model="data.brand_name"
              :rules="rules.brand_name"
              label="Barcode"
              required
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn v-if="modal" class="mr-4" text large @click="closeModal">Cancel</v-btn>
        <v-spacer />
        <v-btn text :color="color" large @click="validate">{{title}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import FormMixin from "@/mixins/FormMixin";

@Component
export default class BrandForm extends FormMixin {}
</script>

<style>
</style>