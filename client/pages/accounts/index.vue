<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3" v-for="link in actionLink" :key="link.title">
        <v-card height="100%" :color="link.color" dark elevation="4" :to="link.to" :link="true">
          <v-card-title class="headline" v-text="link.title" />
          <v-card-subtitle v-text="link.subtitle" />
        </v-card>
      </v-col>

      <v-col cols="8">
        <account-view></account-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AccountView from "@/components/account/AccountView.vue";
@Component({
  components: {
    AccountView
  }
})
export default class Index extends Vue {
  parentPath: string = "accounts";
  actionLink: Array<Object> = [
    {
      title: "Manage Account",
      subtitle: "Add amd edit account info and password",
      color: "blue darken-1",
      to: `/${this.parentPath}/account_add`
    },
    {
      title: "Transactions",
      subtitle: "Renew and replenish out of stock Accounts",
      color: "purple darken-1",
      to: `/${this.parentPath}/stock_manage`
    },
    {
      title: "Manage Role",
      subtitle: "Add Roles and Modify it",
      color: "purple darken-1",
      to: `/${this.parentPath}/role_manage`
    }
  ];
}
</script>
