<template>
  <v-dialog v-model="modalState" width="500">
    <brand-form
      ref="form"
      modal
      :validate="validate"
      :data="brand"
      :isEdit="isEdit"
      :title="brandTitle"
      :rules="rules"
      :isLoading="isLoading"
      :closeModal="closeModal"
    ></brand-form>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import BrandMixin from "@/mixins/BrandMixin";
import BrandForm from "@/components/forms/BrandForm.vue";

@Component({
  components: { BrandForm }
})
export default class BrandModal extends BrandMixin {
  created() {
    this.redirect = false;
  }
}
</script>
