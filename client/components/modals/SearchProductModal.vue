<template>
  <v-dialog v-model="modalShow" scrollable persistent width="500">
    <v-card>
      <v-card-title class="headline pb-4">Search Product</v-card-title>
      <v-text-field
        v-model="searchString"
        append-icon="mdi-magnify"
        class="mx-4 mb-5"
        hide-details
        label="Search"
        solo
      />
      <v-card-text class="pb-0">
        Products
        <b>({{ searched.length }})</b>
      </v-card-text>
      <v-card-text style="max-height: 200px;">
        <v-list-item-group v-model="selected" dense>
          <template v-for="item in searched.items">
            <v-list-item :key="item.barcode" @click="getSelectedItem(item)">
              <v-list-item-avatar color="grey lighten-3">
                <v-img :src="item.image" />
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.product_name" />
                <v-list-item-subtitle v-text="item.barcode" />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn text @click="backPage">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import IProduct from "@/interfaces/productInfoInterface";
import { productStore, frontendStore, processStore } from "@/store";

@Component
export default class SearchProductModal extends Vue {
  dialog: boolean = true;
  searchString: string = "";
  selected: number = 0;

  get searched() {
    return {
      length: productStore.getSearchProducts.length,
      items: productStore.getSearchProducts
    };
  }

  get modalShow() {
    return frontendStore.searchModalState.show;
  }

  set modalShow(show: boolean) {
    frontendStore.setSearchModal({ show });
  }

  created() {
    productStore.fetchProducts();
  }

  backPage() {
    frontendStore.setSearchModal({ show: false });
    this.$router.push("/products");
  }

  getSelectedItem(item: IProduct) {
    console.log("Selected item", item);
    processStore.setCurrentProduct(item);
  }

  @Watch("searchString")
  search(value: string) {
    console.log(value);
    productStore.searchProduct(value);
    // setTimeout(() => productStore.searchProduct(value), 3000);
  }
}
</script>
