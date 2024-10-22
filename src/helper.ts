import { createApi } from "unsplash-js";
import { toast as reactToastify } from "react-toastify";

export const browserApi = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
});

export const toast = (() => {
  function success(message: string) {
    reactToastify.dismiss();
    reactToastify.success(message);
  }
  function error(message: string) {
    reactToastify.dismiss();
    reactToastify.error(message);
  }
  function loading(message: string) {
    reactToastify.dismiss();
    reactToastify.loading(message);
  }
  function info(message: string) {
    reactToastify.dismiss();
    reactToastify.info(message);
  }
  return { success, error, loading, info };
})();
