<template>
  <v-container fluid>
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
            <other-list
              title="Brand"
              :delete-item="showDelete"
              :search-item="searchBrand"
              :list-item="brandList"
              :set-item="setBrand"
              item-name="brand_name"
            />
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import BrandMixin from "@/mixins/BrandMixin";
import OtherList from "@/components/list/OtherList.vue";

@Component({
  components: { OtherList }
})
export default class brand extends BrandMixin {}
</script>
