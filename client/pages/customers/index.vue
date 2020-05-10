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
    <v-row>
      <v-col cols="12">
        <customer-view></customer-view>
      </v-col>
      <v-col cols="8">
        <v-card flat>
          <v-card-text>
            <recent-transaction-table></recent-transaction-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CustomerView from "@/components/customer/CustomerView.vue";
import RecentTransactionTable from "@/components/tables/RecentTransactionTable.vue";
@Component({
  middleware: ["auth"],
  components: { CustomerView, RecentTransactionTable }
})
export default class index extends Vue {
  parentPath: string = "customers";
  actionLink: Array<Object> = [
    {
      title: "Manage Customer",
      subtitle: "Add New and Edit Customer",
      color: "primary",
      action: `/${this.parentPath}/manage`,
      icon: "ticket-percent"
    }
  ];
}
</script>
