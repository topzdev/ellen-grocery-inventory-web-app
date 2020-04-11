<template>
  <v-dialog v-model="modalState" width="500">
    <v-card :loading="loading">
      <v-toolbar :flat="true">
        <v-toolbar-title dark primary-title v-text="categoryTitle" />
        <v-spacer />
      </v-toolbar>

      <v-card-text class="mb-5" style="max-height: 200px;">
        <v-form ref="manageForm" v-model="valid" :lazy-validation="true">
          <v-text-field
            v-model="category.category_name"
            :rules="rules.category_name"
            label="Category Name"
            required
          />

          <v-textarea
            :auto-grow="true"
            label="Description"
            :value="category.description"
            v-model="category.description"
          />
        </v-form>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-btn class="mr-4" text large @click="closeModal">Cancel</v-btn>
        <v-spacer />

        <v-btn color="success" class="d-flex ml-auto" large text @click="validate">Add Category</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import CategoryMixin from "@/mixins/CategoryMixin";

@Component
export default class CategoryModal extends CategoryMixin {
  created() {
    this.redirect = false;
  }

  get loading() {
    return this.categoryStore.getLoading;
  }

  get modalState() {
    return this.frontendStore.categoryModalState;
  }

  set modalState(show: boolean) {
    this.frontendStore.setCategoryModal(show);
  }

  closeModal() {
    this.clearFields();
    this.frontendStore.setCategoryModal(false);
  }

  @Watch("loading")
  isLoading() {
    if (!this.loading) this.closeModal();
  }
}
</script>
