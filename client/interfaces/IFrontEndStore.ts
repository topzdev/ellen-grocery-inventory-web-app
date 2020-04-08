
interface IRedirect {
  redirect?: string | undefined;
}

interface ISnackbar extends IRedirect {
  message?: string;
  show?: boolean;
  success?: boolean;
}

interface IDeleteModal extends IRedirect {
  title?: string;
  message?: string;
  show: boolean;
  name?: string | any | null;
}

interface ISearchModal extends IRedirect {
  message?: string;
  show: boolean;
}

export { ISnackbar, IDeleteModal, ISearchModal, IRedirect };
