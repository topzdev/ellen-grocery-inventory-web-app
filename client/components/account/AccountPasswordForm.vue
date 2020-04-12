<template>
  <v-card class="mt-5">
    <v-form ref="updatePassword">
      <v-card-title v-text="'Change Password'" />
      <v-card-text>
        <v-row>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="password.current_password"
              :rules="rules.current_password"
              type="password"
              required
              label="Current Password"
            />
          </v-col>

          <v-col cols="6"></v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="password.new_password"
              :rules="rules.new_password"
              type="password"
              required
              label="New Password"
            />
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="password.verify_password"
              :rules="rules.verify_password"
              type="password"
              required
              label="Verify Password"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn text color="primary" class="d-flex ml-auto" @click="validatePassword">Change Password</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { accountStore } from "@/store";
import IPasswords from "@/interfaces/IPasswords";

@Component
export default class AccountPasswordForm extends Vue {
  @Prop(Number) accountId?: number;

  password: IPasswords = {
    new_password: "",
    current_password: "",
    verify_password: ""
  };

  validatePassword() {
    //   @ts-ignore;
    if (this.$refs.updatePassword.validate()) {
      accountStore.updatePassword({
        account_id: this.accountId,
        ...this.password
      });
    }
  }

  clearfields() {
    this.password = {
      new_password: "",
      current_password: "",
      verify_password: ""
    };
    // @ts-ignore;
    this.$refs.updatePassword.resetValidation();
  }

  rules: Object = {
    current_password: [(v: any) => !!v || "Current Password is required"],
    new_password: [
      (v: any) => !!v || "New password is required",
      (v: any) => (!!v && v.length > 6) || "Password length must longer than 6",
      (v: any) => (!!v && v.length < 50) || "Password is too long"
    ],
    verify_password: [
      (v: any) =>
        (!!v && v === this.password.new_password) ||
        "Vetify Password not match to new password "
    ]
  };
}
</script>

<style>
</style>