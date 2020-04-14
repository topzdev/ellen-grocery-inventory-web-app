<template>
  <v-dialog v-model="modalState" width="800">
    <customer-form
      modal
      ref="form"
      :validate="validate"
      :data="customer"
      :isEdit="isEdit"
      :title="customerTitle"
      :rules="rules"
      :isLoading="isLoading"
      :closeModal="closeModal"
    ></customer-form>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import CustomerMixin from "@/mixins/CustomerMixin";
import CustomerForm from "@/components/forms/CustomerForm.vue";

@Component({ components: { CustomerForm } })
export default class CustomerModal extends CustomerMixin {
  created() {
    this.redirect = false;
  }
}
</script>

<style>
</style>