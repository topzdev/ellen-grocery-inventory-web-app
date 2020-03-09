<template>
  <v-dialog v-model="modalState" width="500">
    <v-card>
    <v-toolbar :flat="true">
     <v-toolbar-title class="headline" dark primary-title v-text="brandTitle"/>
     <v-spacer/>
       <v-icon class="mr-2" @click="manageItem(item)">mdi-pencil</v-icon>
    </v-toolbar>
      
    <v-card-text style="max-height: 200px;">
      <v-form ref="manageForm" v-model="valid" :lazy-validation="true">
        <v-text-field
            v-model="category.brand_name"
            :rules="rules.brand_name"
            label="Brand Name"
            required
        />

        <v-textarea
              :auto-grow="true"
              label="Description"
              :value="category.description"
              v-model="category.description"
            />
      </v-form>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-btn class="mr-4" text large @click="closeModal" >Cancel</v-btn>
        <v-spacer />
        <v-btn
            v-if="isEdit"
            :disabled="!valid"
            color="error"
            class="mr-4 d-flex ml-auto"
            large
            text
            @click="showDelete"
        >Delete</v-btn>
        <v-btn
        v-if="isEdit"
        :disabled="!valid"
        color="warning"
        class="d-flex ml-auto"
        large
        text
        @click="validate"
        >Update Brand</v-btn>

        <v-btn
        v-else
        :disabled="!valid"
        color="success"
        class="d-flex ml-auto"
        large
        text
        @click="validate"
        >Add Brand</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CategoryMixin from "@/mixins/CategoryMixin"

@Component
export default class CategoryModal extends CategoryMixin {
  valid: boolean = false;
  dialog: boolean = true;

  get modalState() {
    return this.frontendStore.categoryModalState;
  }

  set modalState(show: boolean) {
    this.frontendStore.setBrandModal(show);
  }

  closeModal(){
      this.frontendStore.setBrandModal(false);
  }


  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {

         if(this.isEdit)  this.updateCategory()
         else this.addCategory()
    }
  }
}
</script>
