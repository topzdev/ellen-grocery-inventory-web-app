<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn />
      <v-toolbar-title class="pl-2">Manage Account</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row style="margin-top: -65px;">
        <v-col cols="7">
          <v-card>
            <v-form ref="manageForm" v-model="valid">
              <v-card-title v-text="accountTitle" />
              <v-card-text>
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

                  <template v-if="!isEdit">
                    <v-col cols="6" class="pb-0">
                      <v-text-field
                        v-model="account.username"
                        required
                        :rules="rules.username "
                        label="Username"
                      />
                    </v-col>

                    <v-col cols="6" class="pb-0">
                      <v-text-field
                        v-model="account.password"
                        type="password"
                        required
                        :rules="rules.password "
                        label="Password"
                      />
                    </v-col>

                    <v-col cols="6" class="pb-0">
                      <role-select v-model.number="account.role_id" :rules="rules.role_id" />
                    </v-col>
                  </template>
                </v-row>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <v-btn
                  text
                  :disabled="!valid"
                  color="success"
                  class="d-flex ml-auto"
                  @click="validate"
                >Add Account</v-btn>
              </v-card-actions>
            </v-form>
          </v-card>
        </v-col>

        <v-col cols="5">
          <other-list
            title="Account"
            :delete-item="showDelete"
            :search-item="setAccount"
            :list-item="accountList"
            :set-item="setAccount"
            item-name="fullname"
            item-id="account_id"
          ></other-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AccountMixin from "@/mixins/AccountMixin";
import OtherList from "@/components/list/OtherList.vue";

@Component({
  components: { OtherList }
})
export default class add extends AccountMixin {
  created() {
    this.accountStore.fetchAccounts({});
  }
}
</script>
