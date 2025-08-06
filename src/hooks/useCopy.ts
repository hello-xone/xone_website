import copyToClipboard from "copy-to-clipboard";
import { useNotifications } from "@toolpad/core/useNotifications";
import { useTranslation } from "react-i18next";

export const useCopy = () => {
  const notifications = useNotifications();
  const { t } = useTranslation();

  const copy = (value: string) => {
    try {
      copyToClipboard(value);
      notifications.show(t("common:copiedSuccessfully"), {
        severity: "success",
        autoHideDuration: 2000,
      });
    } catch (err) {
      console.error(err);
      notifications.show(t("common:copyFailed"), {
        severity: "error",
        autoHideDuration: 4000,
      });
    }
  };

  return {
    copy,
  };
};
