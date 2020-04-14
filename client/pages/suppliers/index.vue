<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3" v-for="link in actionLink" :key="link.title">
        <v-card height="100%" :color="link.color" dark elevation="4" :to="link.to" :link="true">
          <v-card-title class="headline" v-text="link.title" />
          <v-card-subtitle v-text="link.subtitle" />
        </v-card>
      </v-col>
    </v-row>
    <supplier-table />
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import supplierTable from "@/components/supplier/SupplierTable.vue";
@Component({
  components: {
    supplierTable
  }
})
export default class index extends Vue {
  supplierPath: string = "suppliers";
  actionLink: Array<Object> = [
    {
      title: "Manage Supplier",
      subtitle: "Add New and Edit Supplier ",
      color: "blue darken-1",
      to: `/${this.supplierPath}/supplier`
    }
  ];

  openSupplierModal() {
    console.log("Hello, World");
  }
}
</script>
