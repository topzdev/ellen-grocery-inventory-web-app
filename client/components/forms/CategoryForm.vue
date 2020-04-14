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
              v-model="data.category_name"
              :rules="rules.category_name"
              label="Category Name"
              required
            />
          </v-col>
          <v-col cols="12">
            <v-textarea v-model="data.description" :auto-grow="true" label="Description" />
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn v-if="modal" class="mr-4" text large @click="closeModal">Cancel</v-btn>
        <v-spacer />
        <v-btn text :color="color" large v-text="title" @click="validate" />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import FormMixin from "@/mixins/FormMixin";

@Component
export default class CategoryForm extends FormMixin {}
</script>

<style>
</style>