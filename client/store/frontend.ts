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
  private showBrandModal: boolean = false;
  private showCategoryModal: boolean = false;

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

  get brandModalState(): boolean {
    return this.showBrandModal;
  }

  get categoryModalState(): boolean {
    return this.showCategoryModal;
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
  private SET_SHOW_SEARCH_MODAL(state: ISearchModal) {
    this.showSearchModal = state;
  }
  @Mutation
  private SET_SHOW_BARCODE_MODAL(state: boolean) {
    this.showBarcodeModal = state;
  }
  @Mutation
  private SET_SHOW_BRAND_MODAL(state: boolean) {
    this.showBrandModal = state;
  }
  @Mutation
  private SET_SHOW_CATEGORY_MODAL(state: boolean) {
    this.showCategoryModal = state;
  }

  @Action({ commit: "SET_OPEN_SIDEBAR" })
  public toggleSidebar(): void {
    return;
  }

  @Action
  public redirect(redirect: string | undefined): void {
    // @ts-ignore
    if (redirect !== undefined) $nuxt.$router.back();
  }

  @Action({ commit: "SET_SHOW_SNACKBAR" })
  public setSnackbar(snackbarConfig: ISnackbar) {
    this.redirect(snackbarConfig.redirect);
    return snackbarConfig;
  }
  @Action({ commit: "SET_SHOW_DELETE_MODAL" })
  public setDeleteModal(modalConfig: IDeleteModal) {
    this.redirect(modalConfig.redirect);
    return modalConfig;
  }
  @Action({ commit: "SET_SHOW_SEARCH_MODAL" })
  public setSearchModal(modalConfig: ISearchModal) {
    return modalConfig;
  }
  @Action({ commit: "SET_SHOW_BARCODE_MODAL" })
  public setBarcodeModal(show: boolean) {
    return show;
  }
  @Action({ commit: "SET_SHOW_BRAND_MODAL" })
  public setBrandModal(show: boolean) {
    return show;
  }
  @Action({ commit: "SET_SHOW_CATEGORY_MODAL" })
  public setCategoryModal(show: boolean) {
    return show;
  }
}
