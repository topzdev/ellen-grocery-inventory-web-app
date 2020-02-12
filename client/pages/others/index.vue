<template>
  <v-row>
    <v-col cols="3" v-for="link in actionLink" :key="link.title">
      <v-card height="100%" :color="link.color" dark elevation="4" :to="link.to" :link="true">
        <v-card-title class="headline" v-text="link.title" />
        <v-card-subtitle v-text="link.subtitle" />
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class index extends Vue {
  readonly parentPath: string = "others";
  readonly actionLink: Array<Object> = [
    {
      title: "Manage Suppliers",
      subtitle: "Add and modify suppliers information",
      color: "blue darken-1",
      to: `/${this.parentPath}/supplier`,
      icon: "truck-delivery"
    },
    {
      title: "Manage Promos",
      subtitle: "Add Promos",
      color: "purple darken-1",
      to: `/${this.parentPath}/stock`,
      icon: "ticket-percent"
    },
    {
      title: "Manage Brands",
      subtitle: "Add and Modify Brands",
      color: "orange darken-1",
      to: `/${this.parentPath}/brands`,
      icon: "ticket-percent"
    },
    {
      title: "Manage Categories",
      subtitle: "Add and Modify Categories",
      color: "orange darken-1",
      to: `/${this.parentPath}/category`,
      icon: "ticket-percent"
    }
  ];
}
</script>
