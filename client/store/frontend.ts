import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "frontend",
  namespaced: true
})
export default class Frontend extends VuexModule {
  private openSidebarState: boolean = false;

  get sidebarState(): boolean {
    return this.openSidebarState;
  }

  @Mutation
  public SET_OPEN_SIDEBAR(): void {
    this.openSidebarState = !this.openSidebarState;
  }

  @Action
  public toggleSidebar(): void {
    this.context.commit("SET_OPEN_SIDEBAR");
  }
}
