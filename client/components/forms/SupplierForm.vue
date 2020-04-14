<template>
  <v-form ref="form" lazy-validation @submit.prevent="validate">
    <v-card :loading="isLoading">
      <v-toolbar flat>
        <v-toolbar-title v-text="title" />
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="data.supplier_name"
              :rules="rules.supplier_name"
              label="Suppliers Name"
              counter="50"
              required
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="data.tel_no"
              :rules="rules.tel_no"
              counter="20"
              label="Telephone Number"
              required
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field v-model="data.cp_no" counter="20" label="Cellphone Number" />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="data.email_address"
              :rules="rules.email_address"
              type="email"
              label="Email Address"
            />
          </v-col>

          <v-col cols="12" class="pb-0">
            <v-text-field
              v-model="data.company_address"
              :rules="rules.company_address"
              label="Company Address"
              required
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field v-model="data.fax" label="Fax" />
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="data.website"
              :rules="rules.website"
              counter="50"
              label="Website"
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="data.description"
              :rules="rules.description"
              :counter="99"
              :auto-grow="true"
              label="Description"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="modal" class="mr-4" text large @click="closeModal">Cancel</v-btn>
        <v-spacer />
        <v-btn :color="color" text large @click="validate">{{title}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>


<script lang="ts">
import { Component } from "vue-property-decorator";
import FormMixin from "@/mixins/FormMixin";

@Component
export default class SupplierForm extends FormMixin {}
</script>
<style>
</style>