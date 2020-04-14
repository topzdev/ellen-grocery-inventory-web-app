<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn to="/others" />
      <v-toolbar-title class="pl-2">Manage Category</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row class="px-3" style="margin-top: -60px;">
        <v-col cols="6">
          <category-form
            ref="form"
            :isEdit="isEdit"
            :isLoading="isLoading"
            :validate="validate"
            :data="category"
            :title="categoryTitle"
            :rules="rules"
            :closeModal="closeModal"
          ></category-form>
        </v-col>
        <v-col cols="6" class="d-flex">
          <other-list
            title="Category"
            :delete-item="showDelete"
            :search-item="searchCategory"
            :list-item="categoryList"
            :set-item="setCategory"
            item-name="category_name"
          ></other-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import CategoryMixin from "@/mixins/CategoryMixin";
import OtherList from "@/components/list/OtherList.vue";
import CategoryForm from "@/components/forms/CategoryForm.vue";

@Component({ components: { OtherList, CategoryForm } })
export default class brand extends CategoryMixin {}
</script>
