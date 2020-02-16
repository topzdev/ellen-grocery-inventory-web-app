interface ISnackbar {
  message?: string;
  show: boolean;
  success?: boolean;
}

interface IDeleteModal {
  message?: string;
  show: boolean;
  name?: string;
}

export { ISnackbar, IDeleteModal };
