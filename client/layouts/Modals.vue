<template>
  <div>
    <delete-modal />
    <search-product-modal />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DeleteModal from "@/components/modals/DeleteModal.vue";
import SearchProductModal from "@/components/modals/SearchProductModal.vue";

@Component({
  components: {
    DeleteModal,
    SearchProductModal
  }
})
export default class Modals extends Vue {}
</script>
