import { frontendStore } from "~/utils/store-accessor";

export function setNotification(
  message: string,
  success: boolean,
  redirect: string
): void {
  frontendStore.setSnackbar({
    message,
    success,
    show: true,
    redirect
  });
}
