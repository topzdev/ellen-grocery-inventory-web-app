import {
  ISnackbar,
  IDeleteModal,
  ISearchModal,
  IMessageModal
} from "~/interfaces/IFrontEndStore";
import { MutationAction, Module, VuexModule, Mutation, Action } from "vuex-module-decorators";

@Module({
  name: "frontend",
  namespaced: true
})
export default class FrontendModule extends VuexModule {
  showSidebar: boolean = true;
  showSidebarMini: boolean = true;
  showNavbar: boolean = true;
  showHoldSidebar: boolean = false;
  navbarFlat: boolean = true;
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
  productViewMode: string = 'table';

  @MutationAction({})
  setSidebar(show: boolean): any {
    return {
      showSidebar: show
    }
  }

  @MutationAction({})
  setSidebarMini(show: boolean): any {
    return {
      showSidebarMini: show
    }
  }

  @MutationAction({})
  setNavbar(show: boolean): any {
    return {
      showNavbar: show
    };
  }

  @MutationAction({})
  setNavbarFlat(flat: boolean): any {
    return {
      navbarFlat: flat
    };
  }

  @MutationAction({})
  setSnackbar(snackbarConfig: ISnackbar): any {
    return {
      showSnackbar: snackbarConfig
    };
  }

  @MutationAction({})
  setDeleteModal(modalConfig: IDeleteModal): any {
    return {
      setDeleteModal: modalConfig
    };
  }

  @MutationAction({})
  setSearchModal(modalConfig: ISearchModal): any {
    return {
      setSearchModal: modalConfig
    };
  }


  @MutationAction({})
  setBarcodeModal(show: boolean): any {
    return {
      showBarcodeModal: show
    };
  }

  @MutationAction({})
  setBrandModal(show: boolean): any {
    return {
      showBrandModal: show
    };
  }

  @MutationAction({})
  setCategoryModal(show: boolean): any {
    return {
      showCategoryModal: show
    };
  }

  @MutationAction({})
  setSupplierModal(show: boolean): any {
    return {
      showSupplierModal: show
    };
  }

  @MutationAction({})
  setCustomerModal(show: boolean): any {
    return {
      showCustomerModal: show
    };
  }

  @MutationAction({})
  setRoleModal(show: boolean): any {
    return {
      showRoleModal: show
    };
  }

  @MutationAction({})
  setProductView(mode: string): any {
    return {
      productViewMode: mode
    };
  }

  @MutationAction({})
  setPaymentTray(show: boolean): any {
    return {
      showPaymentTray: show
    };
  }

  @MutationAction({})
  setMessageModal(modalConfig: IMessageModal): any {
    return {
      showMessageModal: modalConfig
    };
  }

  @MutationAction({})
  setHoldSidebar(show: boolean): any {
    return {
      showHoldSidebar: show
    };
  }

  @Action
  setRedirect(redirect: boolean | string | undefined): any {
    // @ts-ignore;
    if (typeof redirect === 'string') $nuxt.$router.push(redirect)
    // @ts-ignore;
    else if (typeof redirect === 'boolean') $nuxt.$router.back();
  }

}
