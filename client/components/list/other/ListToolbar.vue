<template>
  <div></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ListToolBar extends Vue {
  @Prop() deleteItem!: Function;
  @Prop() selectedItem!: object;
  @Prop() searchLabel!: string;
  @Prop() listLabel!: string;
  @Prop() reset!: Function;
  @Prop() listItem!: Array<Object>;
  @Prop() selected!: any;
  @Prop() setSelected!: Function;
  @Prop() items!: Array<string>;

  searchShow = false;

  get selectedIem() {
    return this.selected;
  }

  set selectedIem(value) {
    this.setSelected(value);
  }
}
</script>

<style>
</style>