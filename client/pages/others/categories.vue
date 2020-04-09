<template>
  <v-container fluid>
    <v-form ref="manageForm" v-model="valid" lazy-validation>
      <v-card flat>
        <v-card-actions>
          <back-btn to="/others" title="Manage Category" />
        </v-card-actions>

        <v-row class="px-3">
          <v-col cols="7">
            <v-card>
              <v-card-title v-text="categoryTitle" />
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
                <v-btn v-if="isEdit" text large @click="setCancel">Cancel</v-btn>
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
          </v-col>
          <v-col cols="5" class="d-flex">
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
      </v-card>
    </v-form>
  </v-container>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import CategoryMixin from "@/mixins/CategoryMixin";
import OtherList from "@/components/list/OtherList.vue";

@Component({ components: { OtherList } })
export default class brand extends CategoryMixin {}
</script>
