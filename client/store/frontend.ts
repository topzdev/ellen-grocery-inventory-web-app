import {
  ISnackbar,
  IDeleteModal,
  ISearchModal
} from "~/interfaces/IFrontEndStore";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { SET_OPEN_SIDEBAR, SET_SHOW_SNACKBAR, SET_SHOW_DELETE_MODAL, SET_SHOW_SEARCH_MODAL, SET_SHOW_BARCODE_MODAL, SET_SHOW_BRAND_MODAL, SET_SHOW_CATEGORY_MODAL, SET_SHOW_SUPPLIER_MODAL, SET_SHOW_CUSTOMER_MODAL, SET_PRODUCT_VIEW_MODE, SET_PAYMENT_TRAY, SET_SHOW_ROLE_MODAL } from '~/configs/types';

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
  private showSupplierModal: boolean = false;
  private showCategoryModal: boolean = false;
  private showCustomerModal: boolean = false;
  private showRoleModal: boolean = false;
  private showPaymentTray: boolean = false;
  private productViewMode: string = 'Product Table';

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

  get supplierModalState(): boolean {
    return this.showSupplierModal;
  }

  get customerModalState(): boolean {
    return this.showCustomerModal;
  }

  get roleModalState(): boolean {
    return this.showRoleModal;
  }

  get getProductView() {
    return this.productViewMode
  }

  get getPaymentTrayState() {
    return this.showPaymentTray;
  }

  @Mutation
  private [SET_OPEN_SIDEBAR](): void {
    this.openSidebar = !this.openSidebar;
  }

  @Mutation
  private [SET_SHOW_SNACKBAR](snackbarConfig: ISnackbar): void {
    this.showSnackbar = snackbarConfig;
  }

  @Mutation
  private [SET_SHOW_DELETE_MODAL](show: IDeleteModal) {
    this.showDeleteModal = show;
  }

  @Mutation
  private [SET_SHOW_SEARCH_MODAL](state: ISearchModal) {
    this.showSearchModal = state;
  }

  @Mutation
  private [SET_SHOW_BARCODE_MODAL](state: boolean) {
    this.showBarcodeModal = state;
  }

  @Mutation
  private [SET_SHOW_BRAND_MODAL](state: boolean) {
    this.showBrandModal = state;
  }

  @Mutation
  private [SET_SHOW_CATEGORY_MODAL](state: boolean) {
    this.showCategoryModal = state;
  }

  @Mutation
  private [SET_SHOW_SUPPLIER_MODAL](state: boolean) {
    this.showSupplierModal = state;
  }

  @Mutation
  private [SET_SHOW_CUSTOMER_MODAL](state: boolean) {
    this.showCustomerModal = state;
  }

  @Mutation
  private [SET_SHOW_ROLE_MODAL](state: boolean) {
    this.showRoleModal = state;
  }

  @Mutation
  private [SET_PAYMENT_TRAY](show: boolean) {
    this.showPaymentTray = show;
  }

  @Mutation
  private [SET_PRODUCT_VIEW_MODE](mode: string) {
    this.productViewMode = mode;
  }


  @Action({ commit: SET_OPEN_SIDEBAR })
  public toggleSidebar(): void {
    return;
  }

  @Action({ commit: SET_SHOW_SNACKBAR })
  public setSnackbar(snackbarConfig: ISnackbar) {
    return snackbarConfig;
  }

  @Action({ commit: SET_SHOW_DELETE_MODAL })
  public setDeleteModal(modalConfig: IDeleteModal) {
    return modalConfig;
  }

  @Action({ commit: SET_SHOW_SEARCH_MODAL })
  public setSearchModal(modalConfig: ISearchModal) {
    return modalConfig;
  }

  @Action({ commit: SET_SHOW_BARCODE_MODAL })
  public setBarcodeModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_SHOW_BRAND_MODAL })
  public setBrandModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_SHOW_CATEGORY_MODAL })
  public setCategoryModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_SHOW_SUPPLIER_MODAL })
  public setSupplierModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_SHOW_CUSTOMER_MODAL })
  public setCustomerModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_SHOW_ROLE_MODAL })
  public setRoleModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_PRODUCT_VIEW_MODE })
  public setProductView(mode: string) {
    return mode;
  }

  @Action({ commit: SET_PAYMENT_TRAY })
  public setPaymentTray(show: boolean) {
    return show;
  }

  @Action
  public setRedirect(redirect: boolean | string | undefined) {
    // @ts-ignore;
    if (typeof redirect === 'string') $nuxt.$router.push(redirect)
    // @ts-ignore;
    else if (typeof redirect === 'boolean') $nuxt.$router.back();
  }

}
