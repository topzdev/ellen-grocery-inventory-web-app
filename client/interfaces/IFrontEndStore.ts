
interface IRedirect {
  redirect?: string | undefined;
}

interface ISnackbar {
  message?: string;
  show?: boolean;
  success?: boolean;
}

interface IMessageModal {
  show: boolean;
  message?: string;
  type?: string;
  title?: string;
  mode?: string,
  yesLabel?: string,
  noLabel?: string,
  yesFunction?: Function
  noFunction?: Function
}

interface IDeleteModal {
  title?: string;
  message?: string;
  show: boolean;
  name?: string | any | null;
}

interface ISearchModal {
  message?: string;
  show: boolean;
}

interface ISidebar {
  show: boolean;
  mini?: boolean;
}

export { ISnackbar, IDeleteModal, ISearchModal, IRedirect, IMessageModal, ISidebar };
