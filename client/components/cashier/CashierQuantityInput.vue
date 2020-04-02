<template>
  <div>
    <v-btn color="primary" depressed fab x-small dark>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-text-field value="5" class="text-center" type="number"></v-text-field>
    <v-btn color="primary" depressed fab x-small dark>
      <v-icon>mdi-minus</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CashierQuantityInput extends Vue {
  @Prop({ default: 1 }) value: number = 1;
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
