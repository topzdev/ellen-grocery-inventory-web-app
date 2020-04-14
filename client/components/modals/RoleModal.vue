<template>
  <v-dialog v-model="modalState" width="500">
    <role-form
      ref="form"
      :validate="validate"
      :data="role"
      :isEdit="isEdit"
      :title="roleTitle"
      :rules="rules"
      :isLoading="isLoading"
      :closeModal="closeModal"
    ></role-form>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import RoleMixin from "@/mixins/RoleMixin";
import RoleForm from "@/components/forms/RoleForm.vue";

@Component({ components: { RoleForm } })
export default class ComponentName extends RoleMixin {
  created() {
    this.redirect = false;
  }
}
</script>

<style>
</style>