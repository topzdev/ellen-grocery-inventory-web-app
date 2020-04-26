<template>
  <v-card :color="color" dark elevation="4" :class="orientation" class="d-flex">
    <div class="d-flex">
      <v-icon :style="iconStyle">{{ icon }}</v-icon>
      <v-spacer></v-spacer>
      <div class="text-right">
        <v-card-title :class="titleClass">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{subtitle}}</v-card-subtitle>
      </div>
    </div>
    <v-card-text :class="valueClass" class="lighten-1 text-right white--text">{{ value }}</v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class DashboardCard extends Vue {
  @Prop(String) title: string;
  @Prop([String, Number]) value: string | number;
  @Prop({ default: "primary" }) color: string;
  @Prop(String) icon: string;
  @Prop(String) subtitle: string;
  @Prop(Boolean) small: boolean;

  get orientation() {
    return this.small ? "flex-column-reverse" : "flex-column";
  }

  get titleClass() {
    return this.small ? "subtitle-2" : "title";
  }

  get valueClass() {
    return `${this.color} ${this.small ? "py-2 title" : "py-3 title"}`;
  }

  get iconStyle() {
    return `font-size: ${this.small ? "45px" : "75px"} !important;`;
  }
}
</script>

<style scoped>
.v-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 12px;
  opacity: 0.8;
}
</style>
