<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn to="/others" />
      <v-toolbar-title class="pl-2">Manage Brand</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row class="px-3" style="margin-top: -60px;">
        <v-col cols="6">
          <brand-form
            ref="form"
            :validate="validate"
            :data="brand"
            :isEdit="isEdit"
            :title="brandTitle"
            :rules="rules"
            :isLoading="isLoading"
            :closeModal="closeModal"
          ></brand-form>
        </v-col>
        <v-col cols="6">
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
import BrandForm from "@/components/forms/BrandForm.vue";

@Component({
  components: { OtherList, BrandForm }
})
export default class BrandPage extends BrandMixin {}
</script>
