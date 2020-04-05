<template>
  <v-form ref="manageForm" v-model="valid" lazy-validation>
    <v-card flat>
      <v-card-actions>
        <back-btn to="/others" title="Add Customer" />
      </v-card-actions>
      <v-row class="px-3">
        <v-col cols="4">
          <v-card>
            <v-card-text>
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="customer.firstname"
                    :rules="rules.firstname"
                    label="First name"
                    required
                  />
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="customer.lastname"
                    :rules="rules.lastname"
                    label="Last name"
                    required
                  />
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="customer.home_address"
                    :rules="rules.home_address"
                    label="Home Address"
                    required
                  />
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="customer.email_address"
                    :rules="rules.email_address"
                    label="Email Address"
                  />
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="customer.cp_no"
                    :rules="rules.cp_no"
                    label="Cellphone Number"
                  />
                </v-col>
                <v-col cols="12" class="pb-0">
                  <v-text-field
                    v-model="customer.tel_no"
                    :rules="rules.tel_no"
                    label="Telephone Number"
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
              >Add Customer</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-form>
</template>

<script>
import { Component } from "vue-property-decorator";
import CustomerMixin from "@/mixins/CustomerMixin";
import CustomerTable from "@/components/customer/CustomerTable.vue";
@Component({
  components: { CustomerTable }
})
export default class AddCustomer extends CustomerMixin {}
</script>

<style></style>
