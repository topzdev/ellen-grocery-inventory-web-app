<template>
  <v-form ref="supplierForm" v-model="valid" :lazy-validation="true">
    <v-toolbar :color="''" :flat="true">
      <v-toolbar-title class="display-1 font-weight-bold">Add Supplier</v-toolbar-title>
    </v-toolbar>
    <v-row class="px-4">
      <v-col cols="8">
        <v-row>
          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="supplier.supplier_name"
              :rules="rules.supplier_name"
              label="Suppliers Name"
              required
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="supplier.tel_no"
              :rules="rules.tel_no"
              label="Telephone Number"
              required
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field v-model="supplier.cp_no" label="Cellphone Number" />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field
              v-model="supplier.email"
              :rules="rules.email"
              type="email"
              label="Email Address"
              required
            />
          </v-col>

          <v-col cols="12" class="pb-0">
            <v-text-field
              v-model="supplier.address"
              :rules="rules.address"
              label="Company Address"
              required
            />
          </v-col>

          <v-col cols="6" class="pb-0">
            <v-text-field v-model="supplier.fax" label="Fax" />
          </v-col>
          <v-col cols="6" class="pb-0">
            <v-text-field v-model="supplier.website" :rules="rules.website" label="Website" />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="supplier.description"
              :rules="rules.description"
              :counter="99"
              :auto-grow="true"
              label="Description"
            />
          </v-col>
        </v-row>
        <v-divider />
        <v-row>
          <v-col class="d-flex">
            <v-btn class="mr-4" large>Cancel</v-btn>
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4 d-flex ml-auto"
              large
              @click="validate"
            >Add Supplier</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import SupplierInfoMixin from "@/mixins/SupplierInfoMixin";
@Component
export default class Supplier extends SupplierInfoMixin {
  valid: boolean = false;

  validate(): void {
    // @ts-ignore
    if (this.$refs.supplierForm.validate()) {
      this.addSupplier();
    }
  }
}
</script>
