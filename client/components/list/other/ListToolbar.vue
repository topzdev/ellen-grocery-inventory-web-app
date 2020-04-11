<template>
  <div>
    <v-toolbar
      :dark="selectedItem ? true : false"
      flat
      :color="selectedItem ? 'primary lighten-1': ''"
    >
      <v-btn v-if="selectedItem" icon @click="reset">
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
          <v-list-item-group v-model="selectedIem" color="primary">
            <v-list-item v-for="item in items" :key="item">
              <v-list-item-title>{{ item }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-card-text class="py-0" v-if="searchShow">
      <v-text-field
        class="py-2"
        :placeholder="searchLabel"
        :hide-details="true"
        @input="searchItem"
      />
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ListToolBar extends Vue {
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