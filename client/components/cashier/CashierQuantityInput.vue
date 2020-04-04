<template>
  <div class="d-flex align-center">
    <v-btn @click="value--" :disabled="value < 1" color="primary" depressed fab x-small dark>
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-text-field v-model.number="model" class="text-center" type="number"></v-text-field>
    <v-btn @click="value++" :disabled="maxValue" color="primary" depressed fab x-small dark>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CashierQuantityInput extends Vue {
  @Prop({ default: 10 }) max: number | undefined;
  @Prop(Number) min: number | undefined;
  @Prop(Number) model: number | undefined;
  value = 1;

  get maxValue() {
    if (this.max === undefined) return false;
    return this.value >= this.max ? true : false;
  }

  valueValidate(value: number) {
    console.log(value);
    if (this.max === undefined) return (this.value = value);
    if (value >= this.max) return (this.value = this.max);
    // @ts-ignore
    if (value <= 1) return (this.value = 1);
  }

  rules = [];
}
</script>

<style>
.v-text-field__slot input {
  text-align: center;
  -webkit-appearance: none;
}
.v-text-field__slot input::-webkit-outer-spin-button,
.v-text-field__slot input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.v-btn--fab.v-size--x-small {
  height: 25px !important;
  width: 25px !important;
}
</style>
