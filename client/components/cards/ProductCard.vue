<template>
  <v-card class="d-flex product-card" height="100%" elevation="2">
    <v-row no-gutters>
      <v-col cols="auto">
        <v-avatar class="ma-3" size="75px" tile>
          <v-img :src="setUrlImage" height="100%" draggable="false"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="d-flex flex-column justify-space-between">
        <v-card-text style="padding-bottom:0 !important" height="100%" class="px-1">
          <div class="overline" title="category">{{item.category_name}}</div>
          <div class="font-weight-medium" title="product name">{{item.product_name}}</div>
          <div title="caption price">
            ₱ {{item.price}} -
            <span title="quantity">({{item.quantity}})</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small text @click="deleteItem(item)">Delete</v-btn>
          <v-btn small text color="primary" @click="manageItem(item)">Manage</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ProductCRUD from "@/mixins/ProductCRUD";
import IProduct from "../../interfaces/IProduct";
import { cashierStore, frontendStore } from "~/store";

@Component
export default class ProductCard extends ProductCRUD {
  @Prop(Object) item!: IProduct;

  color = "primary";

  get setUrlImage() {
    return this.item.image_url
      ? this.item.image_url
      : require("~/assets/img/noimg.jpg");
  }

  get isOutOfStock() {
    return this.item.quantity <= 0;
  }
}
</script>

