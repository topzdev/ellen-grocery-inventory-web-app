import {
  ISnackbar,
  IDeleteModal,
  ISearchModal,
  IMessageModal
} from "~/interfaces/IFrontEndStore";
import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import { SET_SIDEBAR, SET_SIDEBAR_MINI, SET_SNACKBAR, SET_DELETE_MODAL, SET_SEARCH_MODAL, SET_BARCODE_MODAL, SET_BRAND_MODAL, SET_CATEGORY_MODAL, SET_SUPPLIER_MODAL, SET_CUSTOMER_MODAL, SET_PRODUCT_VIEW_MODE, SET_PAYMENT_TRAY, SET_ROLE_MODAL, SET_NAVBAR, SET_NAVBAR_FLAT, SET_MESSAGE_MODAL } from '~/configs/types';

@Module({
  name: "frontend",
  namespaced: true
})
export default class Frontend extends VuexModule {
  showSidebar: boolean = true;
  showSidebarMini: boolean = true;
  showNavbar: boolean = true;
  navbarFlat: boolean = false;
  showSnackbar: ISnackbar = { show: false };
  showDeleteModal: IDeleteModal = { show: false };
  showSearchModal: ISearchModal = { show: false };
  showMessageModal: IMessageModal = { show: false };
  showBarcodeModal: boolean = false;
  showBrandModal: boolean = false;
  showSupplierModal: boolean = false;
  showCategoryModal: boolean = false;
  showCustomerModal: boolean = false;
  showRoleModal: boolean = false;
  showPaymentTray: boolean = false;
  productViewMode: string = 'Product Table';

  @Mutation
  private [SET_SIDEBAR](show: boolean): void {
    this.showSidebar = show;
  }

  @Mutation
  private [SET_SIDEBAR_MINI](show: boolean): void {
    this.showSidebarMini = show;
  }

  @Mutation
  private [SET_NAVBAR](show: boolean): void {
    this.showNavbar = show;
  }

  @Mutation
  private [SET_SNACKBAR](snackbarConfig: ISnackbar): void {
    this.showSnackbar = snackbarConfig;
  }

  @Mutation
  private [SET_DELETE_MODAL](show: IDeleteModal) {
    this.showDeleteModal = show;
  }

  @Mutation
  private [SET_MESSAGE_MODAL](modalConfig: IMessageModal) {
    this.showMessageModal = modalConfig;
  }

  @Mutation
  private [SET_SEARCH_MODAL](state: ISearchModal) {
    this.showSearchModal = state;
  }

  @Mutation
  private [SET_BARCODE_MODAL](state: boolean) {
    this.showBarcodeModal = state;
  }

  @Mutation
  private [SET_BRAND_MODAL](state: boolean) {
    this.showBrandModal = state;
  }

  @Mutation
  private [SET_CATEGORY_MODAL](state: boolean) {
    this.showCategoryModal = state;
  }

  @Mutation
  private [SET_SUPPLIER_MODAL](state: boolean) {
    this.showSupplierModal = state;
  }

  @Mutation
  private [SET_CUSTOMER_MODAL](state: boolean) {
    this.showCustomerModal = state;
  }

  @Mutation
  private [SET_ROLE_MODAL](state: boolean) {
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

  @Mutation
  private [SET_NAVBAR_FLAT](flat: boolean) {
    this.navbarFlat = flat;
  }

  @Action({ commit: SET_SIDEBAR })
  setSidebar(show: boolean) {
    return show;
  }

  @Action({ commit: SET_SIDEBAR_MINI })
  setSidebarMini(show: boolean) {
    return show;
  }

  @Action({ commit: SET_NAVBAR })
  setNavbar(show: boolean) {
    return show;
  }

  @Action({ commit: SET_NAVBAR_FLAT })
  setNavbarFlat(flat: boolean) {
    return flat;
  }

  @Action({ commit: SET_SNACKBAR })
  setSnackbar(snackbarConfig: ISnackbar) {
    return snackbarConfig;
  }

  @Action({ commit: SET_DELETE_MODAL })
  setDeleteModal(modalConfig: IDeleteModal) {
    return modalConfig;
  }

  @Action({ commit: SET_SEARCH_MODAL })
  setSearchModal(modalConfig: ISearchModal) {
    return modalConfig;
  }

  @Action({ commit: SET_BARCODE_MODAL })
  setBarcodeModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_BRAND_MODAL })
  setBrandModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_CATEGORY_MODAL })
  setCategoryModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_SUPPLIER_MODAL })
  setSupplierModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_CUSTOMER_MODAL })
  setCustomerModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_ROLE_MODAL })
  setRoleModal(show: boolean) {
    return show;
  }

  @Action({ commit: SET_PRODUCT_VIEW_MODE })
  setProductView(mode: string) {
    return mode;
  }

  @Action({ commit: SET_PAYMENT_TRAY })
  setPaymentTray(show: boolean) {
    return show;
  }

  @Action({ commit: SET_MESSAGE_MODAL })
  setMessageModal(modalConfig: IMessageModal) {
    return modalConfig;
  }

  @Action
  setRedirect(redirect: boolean | string | undefined) {
    // @ts-ignore;
    if (typeof redirect === 'string') $nuxt.$router.push(redirect)
    // @ts-ignore;
    else if (typeof redirect === 'boolean') $nuxt.$router.back();
  }

}
