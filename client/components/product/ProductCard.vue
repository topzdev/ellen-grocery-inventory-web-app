<template>
  <v-card
    class="d-flex product-card"
    :class="cardTextDisbled"
    height="100%"
    :ripple="riffleStlye"
    @click="createOrder"
  >
    <v-badge :content="badgeContent" overlap :value="badgeContent">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-avatar class="ma-3" :size="imageSize" tile>
            <v-img :src="setUrlImage" draggable="false"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="d-flex flex-column justify-space-between">
          <v-card-text :style="cardStyle" height="100%">
            <div class="overline" v-if="!isCashier" title="category">{{item.category_name}}</div>
            <p
              class="mb-0"
              :class="titleStyle"
              title="product name"
              style="line-height: 1.2"
            >{{item.product_name}}</p>
            <p title="price">
              ₱ {{item.price}}
              -
              <span
                class="caption mb-0"
                title="quantity"
              >({{item.quantity}})</span>
            </p>
          </v-card-text>
          <v-card-actions v-if="!isCashier">
            <v-spacer></v-spacer>
            <v-btn text @click="manageItem(item)">Manage</v-btn>
            <v-btn text color="error" @click="deleteItem(item)">Delete</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-badge>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import ProductMixin from "@/mixins/ProductMixin";
import IProduct from "../../interfaces/IProduct";
import { cashierStore, frontendStore } from "~/store";

@Component
export default class ProductCard extends ProductMixin {
  @Prop(Object) item!: IProduct;
  @Prop(String) mode: string | undefined;

  get setUrlImage() {
    return this.item.image_url
      ? this.item.image_url
      : require("~/assets/img/noimg.jpg");
  }

  get isCashier() {
    if (this.mode === undefined) return false;
    return true;
  }

  get titleStyle() {
    return this.isCashier ? "subtitle-1 font-weight-bold" : "title";
  }

  get cardStyle() {
    return this.isCashier || "padding-bottom:0 !important";
  }

  get riffleStlye() {
    return this.isCashier ? { class: "primary--text" } : false;
  }

  get imageSize() {
    return this.isCashier ? "70px" : "100px";
  }

  get cardTextDisbled() {
    return this.isCashier ? "user-select-disabled" : "";
  }

  get badgeContent() {
    let content = cashierStore.getOrders.filter(
      item => item.product_id === this.item.product_id
    );

    if (content.length) return content[0].quantity;

    return false;
  }

  createOrder() {
    cashierStore.addOrder({
      product_id: this.item.product_id,
      name: this.item.product_name,
      quantity: 1,
      price: this.item.price
    });
  }
}
</script>


<style scoped>
.product-card .v-badge {
  font-size: 16px;
  display: block !important;
  width: 100%;
}

.user-select-disabled {
  user-select: none;
}
</style>