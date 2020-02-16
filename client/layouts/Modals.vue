<template>
  <div>
    <delete-modal />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DeleteModal from "@/components/modals/DeleteModal";

@Component({
  components: {
    DeleteModal
  }
})
export default class Modals extends Vue {}
</script>
