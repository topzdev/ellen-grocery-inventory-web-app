<template>
  <div>
    <v-row>
      <v-col v-for="link in actionLink" :key="link.title" cols="3">
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
import ProductTable from "@/components/product/ProductTable.vue";
@Component({
  components: {
    ProductTable
  }
})
export default class Index extends Vue {
  parentPath: string = "products";
  actionLink: Array<Object> = [
    {
      title: "Add Product",
      subtitle: "Add New Product",
      color: "blue darken-1",
      to: `/${this.parentPath}/add`
    },
    {
      title: "Manage Product",
      subtitle: "Update or Remove Existing Product Information",
      color: "orange darken-1",
      to: `/${this.parentPath}/manage`
    },
    {
      title: "Manage Stocks",
      subtitle: "Renew and replenish out of stock products",
      color: "purple darken-1",
      to: `/${this.parentPath}/stock`
    }
  ];
}
</script>
