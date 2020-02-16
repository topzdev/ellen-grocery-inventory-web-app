<template>
  <div>
    <product-snackbars />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ProductSnackbars from "@/components/snackbars/ProductSnackbars";
@Component({
  components: {
    ProductSnackbars
  }
})
export default class Snackbars extends Vue {}
</script>
