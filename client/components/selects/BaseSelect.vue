<template>
  <v-select
    :items="items"
    :item-value="itemValue"
    :item-text="itemText"
    :label="label"
    :input="value"
    v-model="selected"
    :return-object="false"
  >
    <template v-if="modalName" v-slot:prepend-item>
      <v-list-item ripple dense @click="openModal">
        <v-list-item-content>
          <v-list-item-title v-text="modalLabel"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SelectMixin from "@/mixins/SelectMixin";
import { frontendStore } from "@/store";

@Component({ inheritAttrs: true })
export default class BaseSelect extends Vue {
  @Prop(Array) items!: Array<Object>;
  @Prop(String) itemValue!: string;
  @Prop(String) itemText!: string;
  @Prop(String) label!: string;
  @Prop(String) modalName!: string;
  @Prop(Number) value: number | undefined;

  set selected(value: any) {
    this.$emit("input", value);
  }

  get selected() {
    return this.value;
  }

  get modalLabel() {
    return `Add More ${this.modalName}`;
  }

  openModal(name: string) {
    //   @ts-ignore
    if (this.modalName) frontendStore[`set${this.modalName}Modal`](true);
  }
}
</script>

<style>
</style>