<template>
  <v-navigation-drawer
    color="primary"
    v-model="show"
    app
    :right="true"
    temporary
    absolute
    width="350"
    dark
  >
    <v-card flat tile color="primary">
      <v-card-title>Hold Transactions</v-card-title>
      <v-card-subtitle>Click the "Continue" to continue the holded transaction</v-card-subtitle>

      <perfect-scrollbar :style="`height: 85vh;`">
        <v-card-text class="pt-0">
          <v-row>
            <v-col v-for="(item, idx) in  holdTransaction" :key="idx">
              <hold-transact-card :hold-info="item" :index="idx"></hold-transact-card>
            </v-col>
          </v-row>
        </v-card-text>
      </perfect-scrollbar>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HoldTransactCard from "@/components/cards/HoldTransactCard.vue";
import { frontendStore, cashierStore } from "../../store";

@Component({
  components: { HoldTransactCard }
})
export default class HoldTransactSidebar extends Vue {
  get show() {
    return frontendStore.showHoldSidebar;
  }

  get holdTransaction() {
    console.log(cashierStore.hold);
    if (cashierStore.hold.length) return cashierStore.hold;
  }

  set show(value: boolean) {
    frontendStore.setHoldSidebar(value);
  }
}
</script>

<style>
</style>