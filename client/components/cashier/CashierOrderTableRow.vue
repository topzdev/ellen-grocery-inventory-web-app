<template>
  <v-hover v-slot:default="{ hover }">
    <v-card tile flat class="d-flex" :color="hover? 'light-blue darken-1': 'transparent'">
      <v-row no-gutters>
        <v-col cols="6" class="td td--name">
          <v-card class="td--name__image" light elevation="1" tile>
            <v-img :src="order.image" height="100%"></v-img>
          </v-card>
          <div>
            <div class="subtitle-1 font-weight-medium td--name__title" v-text="order.name" />
            <div class="caption" v-text="price" />
          </div>
        </v-col>
        <v-col style="max-width: 120px" class="td">
          <cashier-quantity-input
            v-if="!readonly"
            :value="order.quantity"
            :max="order.maxQuantity"
            :input="input"
          ></cashier-quantity-input>
          <div
            v-else
            class="text-center title-1 font-weight-bold"
            style="width: 100%"
          >{{order.quantity}}</div>
        </v-col>
        <v-col class="td td--total">
          <div v-text="totalPrice" />
        </v-col>
      </v-row>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import CashierQuantityInput from "./CashierQuantityInput.vue";
import IOrder from "@/interfaces/IOrder";
import { cashierStore } from "../../store";
import numeral from "numeral";

@Component({
  components: { CashierQuantityInput }
})
export default class CashierOrderTableRow extends Vue {
  @Prop(Object) order!: IOrder;
  @Prop(Boolean) readonly?: boolean;

  input(quantity: any) {
    cashierStore.updateOrder({ ...this.order, quantity });
  }

  get totalPrice() {
    return `₱ ${numeral(this.order.quantity * this.order.price).format(
      "0,0.00"
    )} `;
  }

  get price() {
    return `₱ ${numeral(this.order.price).format("0,0.00")}`;
  }
}
</script>

<style scoped>
.order-card {
  position: relative;
  display: flex;
  transition: all 100ms ease-in;
}

.order-card:hover .order-btn {
  margin-right: 0;
}

.order-btn {
  display: block;
  min-height: 90px;
  width: 90px;
  position: absolute;
  right: 0;
  top: 0;
}
.td {
  display: flex;
  align-items: center;
  padding: 15px;
}

.td--name {
  align-items: flex-start;
}

.td--name__image {
  display: flex;
  height: 55px;
  width: 55px;
  min-width: 55px;
  margin-right: 10px;
  align-items: center;
  border-radius: 6px;
}
.td--name__title {
  line-height: 1.2;
  margin-bottom: 3px;
}

.td--total {
  justify-content: flex-end;
}
</style>