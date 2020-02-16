import { ISnackbar, IDeleteModal } from "@/interfaces/FrontEndStoreInterface";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "frontend",
  namespaced: true
})
export default class Frontend extends VuexModule {
  private openSidebar: boolean = true;
  private showSnackbar: ISnackbar = { show: false };
  private showDeleteModal: IDeleteModal = { show: false };

  get sidebarState(): boolean {
    return this.openSidebar;
  }

  get snackbarState(): ISnackbar {
    return this.showSnackbar;
  }

  get deleteModalState(): IDeleteModal {
    return this.showDeleteModal;
  }

  @Mutation
  private SET_OPEN_SIDEBAR(): void {
    this.openSidebar = !this.openSidebar;
  }
  @Mutation
  private SET_SHOW_SNACKBAR(snackbarConfig: ISnackbar): void {
    this.showSnackbar = snackbarConfig;
  }
  @Mutation
  private SET_SHOW_DELETE_MODAL(show: IDeleteModal) {
    this.showDeleteModal = show;
  }

  @Action
  public toggleSidebar(): void {
    this.context.commit("SET_OPEN_SIDEBAR");
  }

  @Action
  public setSnackbar(snackbarConfig: ISnackbar) {
    this.context.commit("SET_SHOW_SNACKBAR", snackbarConfig);
  }
  @Action
  public setDeleteModal(show: IDeleteModal) {
    this.context.commit("SET_SHOW_DELETE_MODAL", show);
  }
}
