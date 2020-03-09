<template>
  <v-form ref="manageForm" v-model="valid" lazy-validation>
    <v-card flat>
      <v-card-actions>
        <back-btn to="/others" title="Manage Brand" />
      </v-card-actions>

      <v-row class="px-3">
        <v-col cols="7">
          <v-card>
            <v-card-title v-text="brandTitle" />
            <v-card-text>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="brand.brand_name"
                    :rules="rules.brand_name"
                    label="Barcode"
                    required
                  />
                </v-col>
              </v-row>
            </v-card-text>
            <!-- <v-divider /> -->
            <v-card-actions>
              <v-btn v-if="isEdit" text large @click="setCancel">Cancel</v-btn>
              <v-spacer />
              <v-btn
                v-if="!isEdit"
                :disabled="!valid"
                color="success"
                class="d-flex"
                large
                @click="validate"
              >Add Brand</v-btn>
              <v-btn v-if="isEdit" color="warning" large @click="validate">Update Brand</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col cols="5" class="d-flex">
          <v-card width="100%">
            <v-card-text>
              <v-text-field solo label="Search brand" prepend-inner-icon="mdi-magnify" clearable />
              <v-list subheader>
                <v-subheader>Total brands {{brandList.length}}</v-subheader>
                <v-list-item-group v-model="active" color="primary">
                  <v-list-item
                    v-for="(item, i) in brandList.slice(0, 5)"
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
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BrandMixin from "@/mixins/BrandMixin";

@Component
export default class brand extends BrandMixin {
  test() {
    console.log("Hello World");
  }
}
</script>
