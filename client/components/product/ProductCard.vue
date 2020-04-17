<template>
  <v-card
    class="d-flex product-card"
    :class="cardTextDisbled"
    height="100%"
    :ripple="ripple"
    @click="createOrder"
  >
    <v-badge :content="quantity" :color="color" overlap :value="quantity">
      <v-row no-gutters>
        <v-col cols="auto">
          <v-avatar class="ma-3" :size="imageSize" tile>
            <v-img :src="setUrlImage" height="100%" draggable="false"></v-img>
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
  @Prop(String) mode!: string;

  color = "primary";

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

  get ripple() {
    return this.isCashier ? { class: this.color + "--text" } : false;
  }

  get imageSize() {
    return this.isCashier ? "80px" : "100px";
  }

  get cardTextDisbled() {
    return this.isCashier ? "user-select-disabled" : "";
  }

  get quantity() {
    if (this.isCashier) {
      let content = cashierStore.getOrders.filter(
        item => item.product_id === this.item.product_id
      );
      if (content.length) return content[0].quantity;
      return 0;
    }
    return 0;
  }

  createOrder(event: any) {
    if (this.isCashier) {
      let order = {
        product_id: this.item.product_id,
        name: this.item.product_name,
        maxQuantity: this.item.quantity,
        price: this.item.price,
        image: this.item.image_url
      };
      // when ctrl key and click pushed then -1 to quantity
      if (event.ctrlKey) {
        this.color = "error";

        setTimeout(() => {
          this.color = "primary";
        }, 300);

        return cashierStore.updateOrder({
          ...order,
          quantity: this.quantity - 1
        });
      }

      /* only click is pushed execute add product */
      this.color = "primary";
      cashierStore.addOrder({ ...order, quantity: 1 });
    }
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