<template>
  <v-btn x-large text icon @click="back">
    <v-icon x-large>mdi-chevron-left</v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { frontendStore } from "../../store";
@Component
export default class BackButton extends Vue {
  @Prop(String) to: string | undefined;

  back() {
    this.$router.back();
  }

  created() {
    frontendStore.setNavbarFlat(true);
    frontendStore.setSidebar(false);
  }

  destroyed() {
    frontendStore.setSidebar(true);
    frontendStore.setSidebarMini(true);
    frontendStore.setNavbarFlat(false);
  }
}
</script>
