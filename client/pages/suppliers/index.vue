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
    <supplier-table />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import supplierTable from "@/components/tables/supplierTable.vue";
@Component({
  components: {
    supplierTable
  }
})
export default class index extends Vue {
  readonly supplierPath: string = "suppliers";
  readonly actionLink: Array<Object> = [
    {
      title: "Add Supplier",
      subtitle: "Add New Supplier",
      color: "blue darken-1",
      to: `/${this.supplierPath}/add`
    },
    {
      title: "Update Supplier",
      subtitle: "Update Supplier Information",
      color: "orange darken-1",
      to: `/${this.supplierPath}/update`
    }
  ];

  public openSupplierModal() {
    console.log("Hello, World");
  }
}
</script>
