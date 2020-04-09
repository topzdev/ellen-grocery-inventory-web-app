<template>
  <v-dialog v-model="modalState" width="800" style="overflow: hidden !important;">
    <v-card :loading="loading">
      <v-toolbar :flat="true">
        <v-toolbar-title class="headline" dark primary-title v-text="supplierTitle" />
        <v-spacer />
      </v-toolbar>

      <v-card-text style="max-height: 500px; overflow: auto; ">
        <v-form ref="manageForm" v-model="valid" :lazy-validation="true">
          <v-row>
            <v-col cols="12">
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
                    :auto-grow="true"
                    label="Description"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>

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

  validate(): void {
    // @ts-ignore
    if (this.$refs.manageForm.validate()) {
      this.addSupplier();
    }
  }

  closeModal() {
    // @ts-ignore
    this.$refs.manageForm.reset();
    this.frontendStore.setSupplierModal(false);
  }

  @Watch("loading")
  isLoading() {
    if (!this.loading) this.closeModal();
  }
}
</script>
