<template>
  <v-row class="d-flex align-center">
    <v-btn class="mr-1" fab text @click="back">
      <v-icon large dark>mdi-chevron-left</v-icon>
    </v-btn>
    <h1 class="headline font-weight-medium" v-text="title" />
  </v-row>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class BackButton extends Vue {
  @Prop(String) to: string | undefined;
  @Prop(String) title: string | undefined;

  back() {
    this.$router.back();
  }
}
</script>
