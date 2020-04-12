<template>
  <v-card flat tile>
    <v-toolbar color="primary" dark extended flat>
      <v-card-actions>
        <back-btn />
        <v-toolbar-title>Add Supplier</v-toolbar-title>
      </v-card-actions>
    </v-toolbar>
    <v-container>
      <v-form ref="supplierForm" v-model="valid" :lazy-validation="true">
        <v-card style="margin-top: -60px;">
          <v-card-text>
            <v-row class="px-4">
              <v-col cols="12">
                <v-row>
                  <v-col cols="6" class="pb-0">
                    <v-text-field
                      v-model="supplier.supplier_name"
                      :rules="rules.supplier_name"
                      label="Suppliers Name"
                      counter="50"
                      required
                    />
                  </v-col>

                  <v-col cols="6" class="pb-0">
                    <v-text-field
                      v-model="supplier.tel_no"
                      :rules="rules.tel_no"
                      counter="20"
                      label="Telephone Number"
                      required
                    />
                  </v-col>

                  <v-col cols="6" class="pb-0">
                    <v-text-field v-model="supplier.cp_no" counter="20" label="Cellphone Number" />
                  </v-col>

                  <v-col cols="6" class="pb-0">
                    <v-text-field
                      v-model="supplier.email_address"
                      :rules="rules.email_address"
                      type="email"
                      label="Email Address"
                    />
                  </v-col>

                  <v-col cols="12" class="pb-0">
                    <v-text-field
                      v-model="supplier.company_address"
                      :rules="rules.company_address"
                      label="Company Address"
                      required
                    />
                  </v-col>

                  <v-col cols="6" class="pb-0">
                    <v-text-field v-model="supplier.fax" label="Fax" />
                  </v-col>
                  <v-col cols="6" class="pb-0">
                    <v-text-field
                      v-model="supplier.website"
                      :rules="rules.website"
                      counter="50"
                      label="Website"
                    />
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
              </v-col>
            </v-row>
          </v-card-text>
          <!-- <v-divider /> -->
          <v-card-actions>
            <v-spacer />
            <v-btn
              :disabled="!valid"
              color="success"
              class="d-flex ml-auto"
              text
              large
              @click="validate"
            >Add Supplier</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import SupplierMixin from "@/mixins/SupplierMixin";
@Component
export default class Supplier extends SupplierMixin {
  valid: boolean = false;

  validate(): void {
    // @ts-ignore
    if (this.$refs.supplierForm.validate()) {
      this.addSupplier();
    }
  }
}
</script>
