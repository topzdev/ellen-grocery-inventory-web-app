<template>
  <v-form ref="manageForm" v-model="valid" lazy-validation>
    <v-card flat>
      <v-card-actions>
        <back-btn to="/others" title="Manage Role" />
      </v-card-actions>

      <v-row class="px-3">
        <v-col cols="7">
          <v-card>
            <v-card-title v-text="roleTitle" />
            <v-card-text>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="role.role_name"
                    :rules="rules.role_name"
                    label="Role Name"
                    required
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <!-- <v-divider /> -->
            <v-card-actions>
              <v-btn v-if="isEdit" text large @click="setCancel">Cancel</v-btn>
              <v-spacer />
              <v-btn
                v-if="!isEdit"
                :disabled="!valid"
                color="success"
                class="d-flex"
                large
                @click="validate"
              >Add Role</v-btn>
              <v-btn v-if="isEdit" color="warning" large @click="validate">Update Role</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="5" class="d-flex">
          <role-list
            :show-delete="showDelete"
            :search="searchRole"
            :list="roleList"
            :set-item="setRole"
          />
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import RoleMixin from "@/mixins/RoleMixin";
import RoleList from "@/components/role/RoleList.vue";

@Component({
  components: { RoleList }
})
export default class Role extends RoleMixin {}
</script>
