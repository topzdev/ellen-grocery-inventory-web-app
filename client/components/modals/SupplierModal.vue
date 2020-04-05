<template>
  <v-dialog v-model="modalState" width="800">
    <v-card :loading="loading">
      <v-toolbar :flat="true">
        <v-toolbar-title class="headline" dark primary-title v-text="supplierTitle" />
        <v-spacer />
      </v-toolbar>

      <v-card-text>
        <v-form ref="manageForm" v-model="valid" :lazy-validation="true">
          <v-row>
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
                    label="Telephone Number"
                    counter="20"
                    required
                  />
                </v-col>

                <v-col cols="6" class="pb-0">
                  <v-text-field v-model="supplier.cp_no" label="Cellphone Number" counter="50" />
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
                  <v-text-field v-model="supplier.fax" label="Fax" counter="20" />
                </v-col>
                <v-col cols="6" class="pb-0">
                  <v-text-field
                    v-model="supplier.website"
                    :rules="rules.website"
                    label="Website"
                    counter="100"
                  />
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="supplier.description"
                    :rules="rules.description"
                    counter="300"
                    :auto-grow="true"
                    label="Description"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-btn class="mr-4" text large @click="closeModal">Cancel</v-btn>
        <v-spacer />

        <v-btn color="success" class="d-flex ml-auto" large text @click="validate">Add Category</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import SupplierMixin from "@/mixins/SupplierMixin";

@Component
export default class SupplierModal extends SupplierMixin {
  valid: boolean = false;
  dialog: boolean = true;

  created() {
    this.redirect = false;
  }

  get loading() {
    return this.supplierStore.getLoading;
  }

  get modalState() {
    return this.frontendStore.supplierModalState;
  }

  set modalState(show: boolean) {
    this.frontendStore.setSupplierModal(show);
  }

  closeModal() {
    this.frontendStore.setSupplierModal(false);
  }

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      this.addSupplier();
    }
  }

  @Watch("loading")
  isLoading() {
    if (!this.loading) this.frontendStore.setSupplierModal(false);
  }
}
</script>
