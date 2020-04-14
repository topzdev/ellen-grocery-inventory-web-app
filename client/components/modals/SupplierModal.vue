<template>
  <v-dialog v-model="modalState" width="800" style="overflow: hidden !important;">
    <supplier-form
      ref="form"
      :validate="validate"
      :data="supplier"
      :isEdit="isEdit"
      :title="supplierTitle"
      :rules="rules"
      :isLoading="isLoading"
      :closeModal="closeModal"
    ></supplier-form>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import SupplierMixin from "@/mixins/SupplierMixin";
import SupplierForm from "@/components/forms/SupplierForm.vue";

@Component({ components: { SupplierForm } })
export default class SupplierModal extends SupplierMixin {
  created() {
    this.redirect = false;
  }
}
</script>
