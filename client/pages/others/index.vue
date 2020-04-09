<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3" v-for="link in actionLink" :key="link.title">
        <v-card height="100%" :color="link.color" dark elevation="4" :to="link.action" :link="true">
          <v-card-title class="headline" v-text="link.title" />
          <v-card-subtitle v-text="link.subtitle" />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class index extends Vue {
  parentPath: string = "others";
  actionLink: Array<Object> = [
    {
      title: "Manage Brands",
      subtitle: "Branding your product",
      color: "orange darken-1",
      action: `/${this.parentPath}/brand`,
      icon: "ticket-percent"
    },
    {
      title: "Manage Categories",
      subtitle: "Categories your prodocut",
      color: "primary",
      action: `/${this.parentPath}/categories`,
      icon: "ticket-percent"
    },
    {
      title: "Promos and ADs",
      subtitle: "Create promos for products",
      color: "purple darken-1",
      action: `/${this.parentPath}/category`,
      icon: "ticket-percent"
    }
  ];
}
</script>
