<template>
  <div>
    <supplier-table />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import supplierTable from "@/components/tables/supplierTable.vue";
@Component({
  components: {
    supplierTable
  }
})
export default class index extends Vue {}
</script>
