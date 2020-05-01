<template>
  <v-card flat tile height="100vh" class="d-flex align-center justify-center">
    <v-card height="400px" width="500px" flat>
      <v-card-title class="mb-4 primary--text">
        <h1 class="display-1 font-weight-bold">Ellen's Inventory System</h1>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="credential.username" flat outlined label="Username"></v-text-field>
        <v-text-field v-model="credential.password" type="password" flat outlined label="Password"></v-text-field>
        <v-btn x-large block light color="primary" @click="userLogin">Login</v-btn>
      </v-card-text>
      <div v-if="$auth.loggedIn">${{$auth.user}}</div>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { IAuthCredentials } from "../interfaces";
@Component
export default class Index extends Vue {
  credential: IAuthCredentials = {
    username: "johndoe",
    password: "dev123"
  };

  async userLogin() {
    try {
      let response = await this.$auth.loginWith("local", {
        data: this.credential
      });
      console.log(response, this.$auth.loggedIn);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
