<template>
  <v-dialog v-model="modalState" width="500">
    <v-card :loading="loading">
      <v-toolbar :flat="true">
        <v-toolbar-title class="headline" dark primary-title v-text="roleTitle" />
        <v-spacer />
      </v-toolbar>

      <v-card-text style="max-height: 200px;">
        <v-form ref="manageForm" v-model="valid" :lazy-validation="true">
          <v-text-field
            v-model="role.role_name"
            :rules="rules.role_name"
            label="Role Name"
            required
          />
        </v-form>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-btn class="mr-4" text large @click="closeModal">Cancel</v-btn>
        <v-spacer />
        <v-btn
          :disabled="!valid"
          color="success"
          class="d-flex ml-auto"
          large
          text
          @click="validate"
        >Add Role</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import RoleMixin from "@/mixins/RoleMixin";

@Component
export default class ComponentName extends RoleMixin {
  created() {
    this.redirect = false;
  }

  get loading() {
    return this.roleStore.getLoading;
  }

  get modalState() {
    return this.frontendStore.roleModalState;
  }

  set modalState(show: boolean) {
    this.frontendStore.setRoleModal(show);
  }

  closeModal() {
    this.frontendStore.setRoleModal(false);
  }

  @Watch("loading")
  isLoading() {
    if (!this.loading) this.frontendStore.setRoleModal(false);
  }
}
</script>

<style>
</style>