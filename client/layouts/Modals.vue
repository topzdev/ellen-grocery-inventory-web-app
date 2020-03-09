<template>
  <div>
    <delete-modal />
    <search-product-modal />
    <barcode-modal />
    <brand-modal/>
    <category-modal/>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import SearchProductModal from "@/components/modals/SearchProductModal.vue";
import BarcodeModal from "@/components/modals/BarcodeModal.vue";
import BrandModal from "@/components/modals/BrandModal.vue";
import CategoryModal from "@/components/modals/BrandModal.vue";

@Component({
  components: {
    DeleteModal,
    BarcodeModal,
    SearchProductModal,
    BrandModal,
    CategoryModal
  }
})
export default class Modals extends Vue {}
</script>
