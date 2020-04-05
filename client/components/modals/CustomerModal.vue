<template>
  <v-dialog v-model="modalState" width="800">
    <v-card :loading="loading">
      <v-toolbar :flat="true">
        <v-toolbar-title class="headline" dark primary-title v-text="customerTitle" />
        <v-spacer />
      </v-toolbar>

      <v-card-text class="mx-0">
        <v-form ref="manageForm" v-model="valid" lazy-validation>
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col cols="6" class="pb-0">
                  <v-text-field
                    v-model="customer.firstname"
                    :rules="rules.firstname"
                    label="First name"
                    required
                  />
                </v-col>
                <v-col cols="6" class="pb-0">
                  <v-text-field
                    v-model="customer.lastname"
                    :rules="rules.lastname"
                    label="Last name"
                    required
                  />
                </v-col>
                <v-col cols="6" class="pb-0">
                  <v-text-field
                    v-model="customer.home_address"
                    :rules="rules.home_address"
                    label="Home Address"
                    required
                  />
                </v-col>
                <v-col cols="6" class="pb-0">
                  <v-text-field
                    v-model="customer.email_address"
                    :rules="rules.email_address"
                    label="Email Address"
                  />
                </v-col>
                <v-col cols="6" class="pb-0">
                  <v-text-field
                    v-model="customer.cp_no"
                    :rules="rules.cp_no"
                    label="Cellphone Number"
                  />
                </v-col>
                <v-col cols="6" class="pb-0">
                  <v-text-field
                    v-model="customer.tel_no"
                    :rules="rules.tel_no"
                    label="Telephone Number"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-btn class="mr-4" text large @click="closeModal">Cancel</v-btn>
        <v-spacer />

        <v-btn color="success" class="d-flex ml-auto" large text @click="validate">Add Customer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import CustomerMixin from "@/mixins/CustomerMixin";

@Component
export default class CustomerModal extends CustomerMixin {
  created() {
    this.redirect = false;
  }

  get loading() {
    return this.customerStore.getLoading;
  }

  get modalState() {
    return this.frontendStore.customerModalState;
  }

  set modalState(show: boolean) {
    this.frontendStore.setCategoryModal(show);
  }

  closeModal() {
    this.frontendStore.setCategoryModal(false);
  }

  @Watch("loading")
  isLoading() {
    if (!this.loading) this.frontendStore.setCategoryModal(false);
  }
}
</script>

<style>
</style>