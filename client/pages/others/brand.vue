<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn to="/others" />
      <v-toolbar-title class="pl-2">Manage Brand</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row class="px-3" style="margin-top: -60px;">
        <v-col cols="6">
          <v-form ref="manageForm" v-model="valid" lazy-validation>
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
          </v-form>
        </v-col>
        <v-col cols="6" class="d-flex">
          <other-list
            title="Brand"
            :delete-item="showDelete"
            :search-item="searchBrand"
            :list-item="brandList"
            :set-item="setBrand"
            item-name="brand_name"
            item-id="brand_id"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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
