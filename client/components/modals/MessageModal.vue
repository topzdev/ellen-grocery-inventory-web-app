<template>
  <v-dialog :value="modalOpen" persistent width="400">
    <v-card>
      <v-card-title v-text="modalTitle"></v-card-title>
      <v-card-text>
        <div>{{modal.message}}</div>
      </v-card-text>
      <v-card-actions>
        <template v-if="isQuestion">
          <v-btn color="error" text @click="no">No</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="success" text @click="yes">Yes</v-btn>
        </template>
        <template v-else>
          <v-spacer></v-spacer>
          <v-btn text @click="showModal(false)">Okay</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { frontendStore } from "../../store";

@Component
export default class MessangeModal extends Vue {
  created() {
    console.log("Message Modal");
  }

  get modal() {
    return frontendStore.showMessageModal;
  }

  get modalOpen() {
    return frontendStore.showMessageModal.show;
  }

  set modalOpen(show: boolean) {
    this.showModal(show);
  }

  get isQuestion() {
    return this.modal.mode === "question" ? true : false;
  }

  showModal(show: boolean) {
    frontendStore.setMessageModal({ show });
  }

  async yes() {
    if (this.modal.yesFunction) {
      await this.modal.yesFunction();
    }
    this.showModal(false);
  }

  no() {
    if (this.modal.noFunction) this.modal.noFunction();
    this.showModal(false);
  }

  get modalTitle() {
    if (this.modal.title) return this.modal.title;
  }
}
</script>

<style>
</style>