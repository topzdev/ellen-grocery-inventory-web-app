<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <v-card-actions>
        <back-btn />
        <v-toolbar-title>Manage Supplier</v-toolbar-title>
      </v-card-actions>
    </v-toolbar>
    <v-container>
      <v-row style="margin-top: -60px;">
        <v-col cols="7">
          <supplier-form
            ref="form"
            :validate="validate"
            :data="supplier"
            :isEdit="isEdit"
            :title="supplierTitle"
            :rules="rules"
            :isLoading="isLoading"
            :closeModal="closeModal"
          ></supplier-form>
        </v-col>

        <v-col cols="5">
          <other-list
            title="Supplier"
            :delete-item="deleteSupplier"
            :search-item="searchSupplier"
            :list-item="supplierList"
            :set-item="setSupplier"
            item-name="supplier_name"
            item-id="supplier_id"
            two-line="company_address"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import SupplierMixin from "@/mixins/SupplierMixin";
import OtherList from "@/components/list/OtherList.vue";
import SupplierForm from "@/components/forms/SupplierForm.vue";

@Component({
  components: { OtherList, SupplierForm }
})
export default class Supplier extends SupplierMixin {}
</script>
