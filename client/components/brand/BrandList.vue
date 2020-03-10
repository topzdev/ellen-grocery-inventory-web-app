<template>
  <v-card width="100%">
    <v-card-text>
      <v-text-field
        solo
        label="Search brand"
        prepend-inner-icon="mdi-magnify"
        @input="searchBrand"
      />
      <v-list subheader>
        <v-subheader>Total brands {{ brandList.length }}</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in brandList.slice(0, 5)" :key="i" @click="setBrand(item)">
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
}
</script>
