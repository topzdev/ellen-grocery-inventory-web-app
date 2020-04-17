<template>
  <div class="d-flex align-center quantity-input">
    <v-btn @click="decrement" :disabled="value < 1" color="primary" depressed fab x-small dark>
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-text-field
      ref="input"
      :value="value"
      @input="validate"
      @click.native="select"
      hide-details
      class="quantity-input"
      type="number"
    ></v-text-field>
    <v-btn @click="increment" color="primary" depressed fab x-small dark>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CashierQuantityInput extends Vue {
  @Prop({ default: 10 }) max: number | undefined;
  @Prop(Number) value!: number;
  @Prop(Function) input!: Function;

  validate(value: any) {
    console.log(this.value, this.max);
    if (!value) this.input(0);

    let parse = parseInt(value);

    if (this.max === undefined) return this.input(parse);
    if (parse >= this.max) return this.input(this.max);
    this.input(parse);
  }

  increment() {
    let value = this.value + 1;
    this.validate(value);
  }

  decrement() {
    let value = this.value - 1;
    this.validate(value);
  }

  select() {
    // @ts-ignore;
    console.log(this.$refs.input);
  }
}
</script>

<style>
.quantity-input .v-text-field__slot input {
  text-align: center;
  -webkit-appearance: none;
}
.quantity-input .v-text-field__slot input::-webkit-outer-spin-button,
.v-text-field__slot input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

.quantity-input {
  padding: 0 !important;
  margin-top: 0 !important;
}

.quantity-input .v-btn--fab.v-size--x-small {
  height: 25px !important;
  width: 25px !important;
}
</style>
