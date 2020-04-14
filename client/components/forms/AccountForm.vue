<template>
  <v-form ref="form" lazy-validation @submit.prevent="validate">
    <v-card :loading="isLoading">
      <v-toolbar flat>
        <v-toolbar-title v-text="title" />
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="data.firstname"
              required
              :rules="rules.firstname "
              label="First Name"
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="data.middlename"
              required
              :rules="rules.middlename "
              label="Middle Name"
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="data.lastname"
              type="email"
              required
              :rules="rules.lastname "
              label="Last Name"
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="data.email_address"
              required
              :rules="rules.email_address "
              label="Email Address"
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="data.username"
              required
              :rules="rules.username "
              label="Username"
            />
          </v-col>

          <v-col v-if="!isEdit" cols="6" class="pb-0">
            <v-text-field
              v-model="data.password"
              type="password"
              required
              :rules="rules.password "
              label="Password"
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <base-select
              v-model.number="data.role_id"
              :items="roles"
              item-value="role_id"
              item-text="role_name"
              label="Role"
              modal-name="Role"
              :rules="rules.role_id"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn v-if="modal" class="mr-4" text large @click="closeModal">Cancel</v-btn>
        <v-spacer />
        <v-btn :color="color" text large @click="validate">{{title}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>


<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import FormMixin from "@/mixins/FormMixin";

@Component
export default class AccountForm extends FormMixin {
  @Prop(Array) roles?: [];
}
</script>

<style>
</style>