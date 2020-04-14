<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn />
      <v-toolbar-title class="pl-2">Manage Account</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row style="margin-top: -60px;">
        <v-col cols="7">
          <account-form
            ref="form"
            :validate="validate"
            :data="account"
            :isEdit="isEdit"
            :title="accountTitle"
            :rules="rules"
            :roles="roles"
          ></account-form>
          <account-password-form v-if="isEdit" :account-id="account.account_id"></account-password-form>
        </v-col>

        <v-col cols="5">
          <other-list
            title="Account"
            :delete-item="showDelete"
            :search-item="searchAccount"
            :list-item="accountList"
            :set-item="setAccount"
            item-name="fullname"
            item-id="account_id"
            two-line="username"
            over-line="role_name"
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
import AccountPasswordForm from "@/components/account/AccountPasswordForm.vue";
import AccountForm from "@/components/forms/AccountForm.vue";
@Component({
  components: { OtherList, AccountPasswordForm, AccountForm }
})
export default class add extends AccountMixin {
  created() {
    this.accountStore.fetchAccounts({});
  }
}
</script>
