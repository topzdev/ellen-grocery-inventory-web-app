<template>
  <v-card outlined class="d-flex" height="100%">
    <v-row no-gutters>
      <v-col cols="auto">
        <v-avatar class="ma-3" height="100px" width="120px" tile>
          <v-img :src="setUrlImage" draggable="false"></v-img>
        </v-avatar>
      </v-col>
      <v-col class="d-flex flex-column">
        <v-card-text style="padding-bottom:0 !important" height="100%">
          <div class="overline" title="category">{{item.category_name}}</div>
          <p class="title mb-0" title="product name" style="line-height: 1.2">
            {{item.product_name}}
            <span class="subtitle-2 mb-0" title="quantity">({{item.quantity}})</span>
          </p>
          <p class="mb-0" title="price">₱ {{item.price}}</p>
        </v-card-text>
        <v-card-actions class="align-self-end">
          <v-spacer></v-spacer>
          <v-btn text @click="manageItem(item)">Manage</v-btn>
          <v-btn text color="error" @click="deleteItem(item)">Delete</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ProductMixin from "@/mixins/ProductMixin";
import IProduct from "../../interfaces/IProduct";

@Component
export default class ProductCard extends ProductMixin {
  @Prop(Object) item!: IProduct;

  get setUrlImage() {
    return this.item.image_url
      ? this.item.image_url
      : require("~/assets/img/noimg.jpg");
  }
}
</script>

<style>
</style>