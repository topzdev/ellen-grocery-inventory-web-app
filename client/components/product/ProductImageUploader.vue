<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>Product Image</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-card height="300px" width="100%" class="mb-4">
        <input
          type="file"
          name
          ref="fileInput"
          id
          @change="uploader"
          accept="image/*"
          class="file-input"
        />
        <v-img :src="url" height="100%" draggable="false"></v-img>
      </v-card>

      <v-btn large color="primary" block @click="$refs.fileInput.click()">Upload Image</v-btn>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ProductImageUploader extends Vue {
  @Prop(Function) uploader!: Function;
  @Prop(String) url!: string;
}
</script>

<style scoped>
.file-input {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0;
  height: 100%;
  width: 100%;
}
</style>
