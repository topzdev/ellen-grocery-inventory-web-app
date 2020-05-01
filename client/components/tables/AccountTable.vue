<template>
  <v-card>
    <v-simple-table fixed-header :height="height">
      <template v-slot:default>
        <thead>
          <tr>
            <th v-for="item in headers" :key="item.text" :align="item.align">{{item.text}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.account_id">
            <td>{{ item.account_id }}</td>
            <td>{{ item.fullname }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.role_name }}</td>
            <td>
              <div>
                <v-icon class="mr-2" @click="manageItem(item)">mdi-pencil</v-icon>
                <v-icon @click="deleteItem(item)">mdi-delete</v-icon>
              </div>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import AccountMixin from "@/mixins/AccountMixin";
import { accountStore } from "../../store";

@Component
export default class AccountTable extends Vue {
  @Prop({ default: "300px" }) height: string;
  headers: Array<Object> = [
    { text: "Account ID", align: "left", value: "account_id" },
    { text: "Fullname", value: "fullname" },
    { text: "Username", value: "username" },
    { text: "Role", value: "role_name" },
    { text: "Actions", value: "action", sortable: false }
  ];

  get list() {
    return accountStore.accounts;
  }
}
</script>
