<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class KeyPress extends Vue {
  @Prop({ default: null })
  keyCode!: number;

  @Prop({ default: "keyup" })
  event!: string;

  mounted() {
    window.addEventListener(this.event, this.emitEvent, false);
  }
  destroyed() {
    window.removeEventListener(this.event, this.emitEvent, false);
  }
  emitEvent(event: Event) {
    if (event instanceof KeyboardEvent) {
      console.log(event);
      if (event.keyCode === this.keyCode || !this.keyCode) {
        this.$emit("pressed", event.keyCode);
      }
    }
  }
  render() {
    //nothing
  }
}
</script>

<style>
</style>
  