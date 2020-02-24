<template>
  <v-dialog v-model="modalOpen" width="500">
    <v-card>
      <v-card-title class="headline" dark primary-title>Are you sure to delete {{modalInfo.title}}?</v-card-title>

      <v-card-text>
        When deleting
        <b>{{modalInfo.name}}</b>
        {{modalInfo.title}}, it will store on back up where the administrator can delete it.
      </v-card-text>
      <v-divider />

      <v-card-actions>
        <v-btn color="primary" text @click="closeModal(false)">Cancel</v-btn>
        <v-spacer />
        <v-btn color="error" text @click="deleteCurrent">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { frontendStore, processStore } from "@/store";

@Component
export default class DeleteModal extends Vue {
  get modalInfo() {
    return frontendStore.deleteModalState;
  }

  get modalOpen() {
    return frontendStore.deleteModalState.show;
  }

  set modalOpen(show: boolean) {
    this.closeModal(show);
  }

  public closeModal(show: boolean) {
    frontendStore.setDeleteModal({ show });
  }

  public deleteCurrent() {
    processStore.toDeleteItem.deleteFunction!(processStore.toDeleteItem.id);

    processStore.setCurrentToDelete(undefined);

    this.closeModal(false);
  }
}
</script>
