<template>
  <v-dialog v-model="modalState" width="500">
    <category-form
      :isdit="isEdit"
      :isLoading="isLoading"
      :validate="validate"
      :data="category"
      :title="categoryTitle"
      :rules="rules"
      :closeModal="closeModal"
    ></category-form>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import CategoryMixin from "@/mixins/CategoryMixin";
import CategoryForm from "@/components/forms/CategoryForm.vue";

@Component({ components: { CategoryForm } })
export default class CategoryModal extends CategoryMixin {
  created() {
    this.redirect = false;
  }
}
</script>
