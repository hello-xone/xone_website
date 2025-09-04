import copyToClipboard from "copy-to-clipboard";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

export const useCopy = () => {
  const { t } = useTranslation();

  const copy = (value: string) => {
    try {
      copyToClipboard(value);
      toast.success(t("common:copiedSuccessfully"));
    } catch (err) {
      console.error(err);
      toast.error(t("common:copyFailed"));
    }
  };
  return {
    copy,
  };
};
