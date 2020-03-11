<template>
  <v-form ref="manageForm" v-model="valid">
    <v-card flat>
      <v-card-actions>
        <back-btn to="/accounts" title="Update Account" />
      </v-card-actions>
      <v-row class="px-3">
        <v-col cols="8">
          <v-card>
            <v-card-text>
              <v-row class="px-4">
                <v-col cols="12">
                  <v-row>
                    <v-col cols="6" class="pb-0">
                      <v-text-field
                        v-model="account.firstname"
                        required
                        :rules="rules.firstname "
                        label="First Name"
                      />
                    </v-col>

                    <v-col cols="6" class="pb-0">
                      <v-text-field
                        v-model="account.middlename"
                        required
                        :rules="rules.middlename "
                        label="Middle Name"
                      />
                    </v-col>

                    <v-col cols="6" class="pb-0">
                      <v-text-field
                        v-model="account.lastname"
                        type="email"
                        required
                        :rules="rules.lastname "
                        label="Last Name"
                      />
                    </v-col>

                    <v-col cols="6" class="pb-0">
                      <v-text-field
                        v-model="account.email_address"
                        required
                        :rules="rules.email_address "
                        label="Email Address"
                      />
                    </v-col>

                    <v-col cols="6" class="pb-0">
                      <role-select v-model.number="account.role_id" :rules="rules.role_id" />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="error" class="mr-4 d-flex" large @click="showDelete(account)">Delete</v-btn>
              <v-btn
                :disabled="!valid"
                color="success"
                class="d-flex"
                large
                @click="validate"
              >Update Account</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AccountMixin from "@/mixins/AccountMixin";
@Component
export default class Update extends AccountMixin {
  created() {
    this.isEdit = true;
    if (this.accountStore.getCurrentAccount !== undefined) {
      this.account = JSON.parse(
        JSON.stringify(this.accountStore.getCurrentAccount)
      );
    }
  }

  destroy() {
    this.accountStore.fetchSingleAccount(undefined);
  }
}
</script>
