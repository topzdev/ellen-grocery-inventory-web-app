<template>
  <div>
    <barcode-modal />
    <brand-modal />
    <category-modal />
    <supplier-modal />
    <customer-modal />
    <role-modal />
    <message-modal />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import BarcodeModal from "@/components/modals/BarcodeModal.vue";
import BrandModal from "@/components/modals/BrandModal.vue";
import CategoryModal from "@/components/modals/CategoryModal.vue";
import SupplierModal from "@/components/modals/SupplierModal.vue";
import CustomerModal from "@/components/modals/CustomerModal.vue";
import RoleModal from "@/components/modals/RoleModal.vue";
import MessageModal from "@/components/modals/MessageModal.vue";

@Component({
  components: {
    BarcodeModal,
    BrandModal,
    CategoryModal,
    SupplierModal,
    CustomerModal,
    RoleModal,
    MessageModal
  }
})
export default class Modals extends Vue {}
</script>
