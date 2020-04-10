<template>
  <v-card width="100%">
    <v-card-text>
      <v-text-field solo label="Search role" prepend-inner-icon="mdi-magnify" @input="search" />
      <v-list subheader>
        <v-subheader>Total Role {{ list.length }}</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in list.slice(0, 5)" :key="i" @click="setItem(item)">
            <v-list-item-content>
              <v-list-item-title v-text="item.role_name" />
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
import IRole from "../../interfaces/IRole";

@Component
export default class RoleList extends Vue {
  @Prop(Function) showDelete: Function | undefined;
  @Prop(Function) search: Function | undefined;
  @Prop(Array) list: Array<IRole> | undefined;
  @Prop(Number) active: Number | undefined;
  @Prop(Function) setItem: Function | undefined;
}
</script>
