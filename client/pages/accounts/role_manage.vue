<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn />
      <v-toolbar-title class="pl-2">Manage Brand</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row class="px-3" style="margin-top: -60px;">
        <v-col cols="7">
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
        </v-col>
        <v-col cols="5">
          <other-list
            title="Role"
            :delete-item="deleteRole"
            :search-item="searchRole"
            :list-item="roleList"
            :set-item="setRole"
            item-name="role_name"
            item-id="role_id"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import RoleMixin from "@/mixins/RoleMixin";
import OtherList from "@/components/list/OtherList.vue";
import RoleForm from "@/components/forms/RoleForm.vue";

@Component({
  components: { OtherList, RoleForm }
})
export default class Role extends RoleMixin {}
</script>
