<template>
  <div>
    <v-row>
      <v-col cols="3" v-for="link in actionLink" :key="link.title">
        <v-card height="100%" :color="link.color" dark elevation="4" :to="link.action" :link="true">
          <v-card-title class="headline" v-text="link.title" />
          <v-card-subtitle v-text="link.subtitle" />
        </v-card>
      </v-col>
    </v-row>
    <customer-table></customer-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CustomerTable from "@/components/customer/CustomerTable.vue";
@Component({
  components: { CustomerTable }
})
export default class index extends Vue {
  parentPath: string = "customers";
  actionLink: Array<Object> = [
    {
      title: "Add Customer",
      subtitle: "Create Customer Information",
      color: "primary",
      action: `/${this.parentPath}/customer_add`,
      icon: "ticket-percent"
    },
    {
      title: "Manage Customer",
      subtitle: "Create Customer Information",
      color: "warning",
      action: `/${this.parentPath}/customer_manage`,
      icon: "ticket-percent"
    }
  ];
}
</script>
