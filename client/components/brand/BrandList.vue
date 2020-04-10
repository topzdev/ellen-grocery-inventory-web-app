<template>
  <v-card width="100%">
    <v-card-text max-height="400px">
      <v-text-field
        solo
        label="Search brand"
        prepend-inner-icon="mdi-magnify"
        @input="searchBrand"
      />
      <v-list subheader>
        <v-subheader>
          <v-row>
            <v-col>Total brands {{ brandList.length }}</v-col>
            <v-col cols="auto">
              <v-select :items="items" label="Rows" dense flat single-line v-model="selected"></v-select>
            </v-col>
          </v-row>
        </v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="(item, i) in brandList.slice(0, rows)"
            :key="i"
            @click="setBrand(item)"
          >
            <v-list-item-content>
              <v-list-item-title v-text="item.brand_name" />
            </v-list-item-content>
            <v-spacer />

            <v-list-item-icon>
              <v-icon class="mr-2" @click="showDelete(item)">mdi-delete</v-icon>
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
export default class BrandList extends Vue {
  @Prop(Function) showDelete: Function | undefined;
  @Prop(Function) searchBrand: Function | undefined;
  @Prop(Array) brandList: Array<IBrand> | undefined;
  @Prop(Number) active: Number | undefined;
  @Prop(Function) setBrand: Function | undefined;
  selected = "5";
  items = ["5", "10", "25", "all"];

  get rows() {
    return this.selected === "all" ? this.brandList!.length : this.selected;
  }
}
</script>
