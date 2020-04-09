<template>
  <v-container fluid>
    <v-form ref="manageForm" v-model="valid">
      <v-card flat>
        <v-card-actions>
          <back-btn to="/accounts" title="Add Account" />
        </v-card-actions>
        <v-row class="px-3">
          <v-col cols="7">
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
                    </v-row>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn class="mr-4" large>Cancel</v-btn>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4 d-flex ml-auto"
                  large
                  @click="validate"
                >Add Account</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import AccountMixin from "@/mixins/AccountMixin";
@Component
export default class add extends AccountMixin {}
</script>
