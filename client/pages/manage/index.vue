<template>
  <v-card class="px-5 py-5 mt-4">
    <v-row>
      <v-col cols="3" v-for="link in actionLink" :key="link.title">
        <v-card
          height="100%"
          :color="link.color"
          dark
          elevation="4"
          :to="link.to"
          :link="true"
        >
          <v-card-title class="headline" v-text="link.title" />
          <v-card-subtitle v-text="link.subtitle" />
        </v-card>
      </v-col>
    </v-row>

    <product-table />
  </v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProductTable from "@/components/product/ProductTable.vue";
@Component({
  components: {
    ProductTable
  }
})
export default class Index extends Vue {
  readonly parentPath: string = "manage";
  readonly actionLink: Array<Object> = [
    {
      title: "Add Product",
      subtitle: "Add New Product",
      color: "blue darken-1",
      to: `/${this.parentPath}/add`
    },
    {
      title: "Manage Stocks",
      subtitle: "Renew and replenish out of stock products",
      color: "purple darken-1",
      to: `/${this.parentPath}/stock`
    },

    {
      title: "Manage Product",
      subtitle: "Update or Remove Existing Product Information",
      color: "orange darken-1",
      to: `/${this.parentPath}/update`
    },
    {
      title: "Manage Addons",
      subtitle: "Manage Category, Brand and Supplier",
      color: "pink darken-1",
      to: `/${this.parentPath}/add`
    }
  ];
}
</script>
