import {
  ISnackbar,
  IDeleteModal,
  ISearchModal
} from "~/interfaces/IFrontEndStore";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "frontend",
  namespaced: true
})
export default class Frontend extends VuexModule {
  private openSidebar: boolean = true;
  private showSnackbar: ISnackbar = { show: false };
  private showDeleteModal: IDeleteModal = { show: false };
  private showSearchModal: ISearchModal = { show: false };
  private showBarcodeModal: boolean = false;

  get sidebarState(): boolean {
    return this.openSidebar;
  }

  get snackbarState(): ISnackbar {
    return this.showSnackbar;
  }

  get deleteModalState(): IDeleteModal {
    return this.showDeleteModal;
  }

  get searchModalState(): ISearchModal {
    return this.showSearchModal;
  }

  get barcodeModalState(): boolean {
    return this.showBarcodeModal;
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
  @Mutation
  private SET_SHOW_SEARCH_MODAL(searchModalConfig: ISearchModal) {
    this.showSearchModal = searchModalConfig;
  }
  @Mutation
  private SET_SHOW_BARCODE_MODAL(barcodeModalConfig: boolean) {
    this.showBarcodeModal = barcodeModalConfig;
  }

  @Action
  public toggleSidebar(): void {
    this.context.commit("SET_OPEN_SIDEBAR");
  }

  @Action
  public redirect(redirect: string | undefined): void {
    if (redirect !== undefined) $nuxt.$router.push(redirect);
  }

  @Action
  public setSnackbar(snackbarConfig: ISnackbar) {
    this.redirect(snackbarConfig.redirect);
    this.context.commit("SET_SHOW_SNACKBAR", snackbarConfig);
  }
  @Action
  public setDeleteModal(modalConfig: IDeleteModal) {
    this.redirect(modalConfig.redirect);
    this.context.commit("SET_SHOW_DELETE_MODAL", modalConfig);
  }
  @Action
  public setSearchModal(modalConfig: ISearchModal) {
    this.context.commit("SET_SHOW_SEARCH_MODAL", modalConfig);
  }
  @Action
  public setBarcodeModal(show: boolean) {
    this.context.commit("SET_SHOW_BARCODE_MODAL", show);
  }
}
