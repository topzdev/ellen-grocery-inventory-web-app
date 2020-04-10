<template>
  <v-card width="100%">
    <v-card-title>
      <v-text-field
        solo
        :label="searchLabel"
        :hide-details="true"
        prepend-inner-icon="mdi-magnify"
        @input="searchItem"
      />
    </v-card-title>
    <v-card-text>
      <v-row no-gutters>
        <v-col class="d-flex align-center">Total {{title}} {{ listItem.length }}</v-col>
        <v-col cols="auto">
          <v-select
            :items="items"
            label="Rows"
            :hide-details="true"
            placeholder="Select rows to show"
            dense
            flat
            single-line
            v-model="selected"
          ></v-select>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text style="max-height: 400px; overflow: auto;">
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in listItem.slice(0, rows)" :key="i" @click="setItem(item)">
            <v-list-item-content>
              <v-list-item-title v-text="item[itemName]" />
            </v-list-item-content>
            <v-spacer />

            <v-list-item-icon>
              <v-icon class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import IBrand from "../../interfaces/IBrand";

@Component
export default class OtherList extends Vue {
  @Prop(String) title: String | undefined;
  @Prop(Function) deleteItem: Function | undefined;
  @Prop(Function) searchItem: Function | undefined;
  @Prop(Array) listItem!: Array<IBrand>;
  @Prop(Number) active: Number | undefined;
  @Prop(Function) setItem: Function | undefined;
  @Prop(String) itemName: String | undefined;
  selected = "5";
  items = ["5", "10", "25", "All"];

  get rows() {
    return this.selected === "All" ? this.listItem!.length : this.selected;
  }

  get searchLabel() {
    return "Search " + this.title;
  }
}
</script>