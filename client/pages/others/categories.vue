<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <back-btn to="/others" />
      <v-toolbar-title class="pl-2">Manage Category</v-toolbar-title>
    </v-toolbar>
    <v-container>
      <v-row class="px-3" style="margin-top: -60px;">
        <v-col cols="6">
          <v-form ref="manageForm" v-model="valid" lazy-validation>
            <v-card>
              <v-toolbar flat>
                <v-toolbar-title v-text="categoryTitle" />
              </v-toolbar>
              <v-divider></v-divider>
              <v-card-text>
                <v-row>
                  <v-col cols="12" class="pb-0">
                    <v-text-field
                      v-model="category.category_name"
                      :rules="rules.category_name"
                      label="Category Name"
                      required
                    />
                  </v-col>

                  <v-col cols="12">
                    <v-textarea
                      v-model="category.description"
                      :auto-grow="true"
                      label="Description"
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
                >Add Category</v-btn>
                <v-btn v-if="isEdit" color="warning" large @click="validate">Update Category</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
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

@Component({ components: { OtherList } })
export default class brand extends CategoryMixin {}
</script>
