<template>
  <div>
    <v-row>
      <v-col cols="3" v-for="link in actionLink" :key="link.title">
        <v-card height="100%" :color="link.color" dark elevation="4" :to="link.to" :link="true">
          <v-card-title class="headline" v-text="link.title" />
          <v-card-subtitle v-text="link.subtitle" />
        </v-card>
      </v-col>
    </v-row>

    <product-table />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProductTable from "@/components/tables/ProductTable.vue";
@Component({
  components: {
    ProductTable
  }
})
export default class Index extends Vue {
  parentPath: string = "products";
  actionLink: Array<Object> = [
    {
      title: "Add Account",
      subtitle: "Add New Account",
      color: "blue darken-1",
      to: `/${this.parentPath}/add`
    },
    {
      title: "Update Account",
      subtitle: "Update or Remove Existing Account Information",
      color: "orange darken-1",
      to: `/${this.parentPath}/manage`
    },
    {
      title: "Transactions",
      subtitle: "Renew and replenish out of stock Accounts",
      color: "purple darken-1",
      to: `/${this.parentPath}/stock`
    },
    {
      title: "Manage Role",
      subtitle: "Renew and replenish out of stock Accounts",
      color: "purple darken-1",
      to: `/${this.parentPath}/stock`
    }
  ];
}
</script>
