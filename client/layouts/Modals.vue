<template>
  <div>
    <delete-modal />
    <search-product-modal />
    <barcode-modal />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import SearchProductModal from "@/components/modals/SearchProductModal.vue";
import BarcodeModal from "@/components/modals/BarcodeModal.vue";

@Component({
  components: {
    DeleteModal,
    BarcodeModal,
    SearchProductModal
  }
})
export default class Modals extends Vue {}
</script>
