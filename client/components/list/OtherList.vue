<template>
  <v-card width="100%">
    <v-toolbar
      :dark="selectedItem ? true : false"
      flat
      :color="selectedItem ? 'primary lighten-1': ''"
    >
      <v-btn
        v-if="selectedItem"
        icon
        @click="selectedItem = null; selectedId = null; setItem(undefined)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-toolbar-title v-text="listLabel" />
      <v-spacer></v-spacer>
      <v-scale-transition>
        <v-btn
          v-if="selectedItem"
          key="delete"
          title="Delete"
          icon
          @click="deleteItem(selectedItem)"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-scale-transition>
      <v-btn icon @click="searchShow = !searchShow">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-filter-outline</v-icon>
          </v-btn>
        </template>

        <v-list width="150">
          <v-list-item-group v-model="selected" color="primary">
            <v-list-item v-for="item in items" :key="item">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-card-text class="py-0" v-if="searchShow">
      <v-text-field
        filled
        rounded
        class="pt-2"
        :placeholder="searchLabel"
        :hide-details="true"
        @input="searchItem"
      />
    </v-card-text>

    <v-list max-height="400px" style="overflow: auto">
      <v-list-item-group v-model="selectedId" color="primary">
        <v-list-item
          v-for="item in listItem.slice(0, rows)"
          :key="item[itemId]"
          @click="selectedItem = item; selectedId = item[itemId]; setItem(selectedItem)"
        >
          <v-list-item-content>
            <v-list-item-subtitle
              v-if="overLine"
              class="overline font-weight-bold primary--text"
              v-text="item[overLine]"
            />

            <v-list-item-title v-text="item[itemName]" />
            <v-list-item-subtitle v-if="twoLine" v-text="item[twoLine]" />
          </v-list-item-content>
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
  @Prop(Function) deleteItem: Function | undefined;
  @Prop(Function) searchItem: Function | undefined;
  @Prop(Function) setItem: Function | undefined;
  @Prop(Number) active: Number | undefined;
  @Prop(String) title: String | undefined;
  @Prop(String) itemName!: string;
  @Prop(String) itemId!: string;
  @Prop(String) twoLine!: string;
  @Prop(String) overLine!: string;
  @Prop(Array) listItem!: Array<Object>;

  selected = 0;
  items = ["5", "10", "25", "All"];
  searchShow = false;
  selectedId: any = null;
  selectedItem: any = null;

  get rows() {
    return this.selected === 3
      ? this.listItem.length
      : this.items[this.selected];
  }
  get searchLabel() {
    return "Search " + this.title;
  }
  get listLabel() {
    return this.selectedItem
      ? `Selected "${this.selectedItem[this.itemName]}"`
      : `${this.title} List (${this.listItem.length})`;
  }
}
</script>