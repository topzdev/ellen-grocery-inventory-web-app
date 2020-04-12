<template>
  <v-card width="100%">
    <list-toolbar
      :list-label="listLabel"
      :search-label="searchLabel"
      :selected-item="selectedItem"
      :set-selected="setSelected"
      :reset="reset"
      :items="items"
      :list-item="listItem"
      :delete-item="deleteItem"
    ></list-toolbar>

    <v-list max-height="400px" style="overflow: auto">
      <v-list-item-group v-model="selectedId" color="primary">
        <v-list-item
          v-for="item in listItem.slice(0, rows)"
          :key="item[itemId]"
          @click="selectedItem = item; selectedId = item[itemId]; setItem(selectedItem)"
        >
          <v-list-item-content>
            <v-list-item-title v-text="item[itemName]" />
          </v-list-item-content>
          <v-spacer />
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IBrand from "../../interfaces/IBrand";
import ListToolbar from "@/components/list/other/ListToolbar.vue";

@Component({
  components: { ListToolbar }
})
export default class OtherList extends Vue {
  @Prop(Function) deleteItem!: Function;
  @Prop(Function) searchItem!: Function;
  @Prop(Function) setItem!: Function;
  @Prop(Number) active!: Number;
  @Prop(String) title!: String;
  @Prop(String) itemName!: string;
  @Prop(String) itemId!: string;
  @Prop(Array) listItem!: Array<Object>;

  selectedId = null;
  selectedItem: any = null;
  selected = 0;
  items = ["5", "10", "25", "All"];

  get rows() {
    return this.selected === 3
      ? this.listItem.length
      : this.items[this.selected];
  }

  reset() {
    this.selectedItem = null;
    this.selectedId = null;
    this.setItem(undefined);
  }

  get listLabel() {
    return this.selectedItem
      ? `Selected "${this.selectedItem[this.itemName]}"`
      : `${this.title} List (${this.listItem.length})`;
  }

  get searchLabel() {
    return "Search " + this.title;
  }

  setSelected(value: any) {
    this.selected = value;
  }
}
</script>