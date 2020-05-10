<template>
  <div v-if="$auth.loggedIn">
    <v-app-bar color="primary" :hidden="!navbar" dark :app="navbar" :flat="flat">
      <v-toolbar-title v-text="title" />

      <v-spacer />
      <v-menu offset-y min-width="200px">
        <template v-slot:activator="{ on }">
          <v-btn class="d-flex flex-column" text dark v-on="on">
            <div>{{fullname}}</div>
            <v-icon class="ml-5">mdi-chevron-down</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-subheader>{{rolename}}</v-subheader>
          <v-list-item @click="logout()">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { frontendStore } from "@/store";

@Component
export default class Navbar extends Vue {
  title: string = "Ellen Inventory System";

  async logout() {
    console.log("Hello, Logout");
    try {
      const result = await this.$auth.logout();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  get fullname() {
    if (this.$auth.loggedIn) {
      const { firstname, lastname } = this.$auth.user;
      return `${firstname} ${lastname}`;
    }
    return "Login";
  }

  get rolename() {
    if (this.$auth.loggedIn) {
      return this.$auth.user.role_name;
    }
    return "";
  }

  get showSidebar() {
    return frontendStore.showSidebar;
  }

  get showSidebarMini() {
    return frontendStore.showSidebarMini;
  }

  get flat() {
    return frontendStore.navbarFlat;
  }

  get navbar() {
    return frontendStore.showNavbar;
  }
}
</script>
