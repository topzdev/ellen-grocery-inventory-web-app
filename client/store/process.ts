import { VuexModule, Action, Mutation, Module } from "vuex-module-decorators";
import { ICurrentDelete } from "@/interfaces/ProcessInterface";
@Module({
  name: "process",
  namespaced: true,
  stateFactory: true
})
export default class Process extends VuexModule {
  private currentDelete: ICurrentDelete = {};

  get toDeleteItem(): ICurrentDelete {
    return this.currentDelete;
  }

  @Mutation
  private SET_CURRENT_DELETE(toDelete: ICurrentDelete) {
    this.currentDelete = toDelete;
  }

  @Action
  setCurrentToDelete(toDelete: ICurrentDelete | undefined) {
    this.context.commit("SET_CURRENT_DELETE", toDelete);
  }
}
