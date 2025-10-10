import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import image404Light from "@/assets/imgs/404/dark-404.png";
import image404Dark from "@/assets/imgs/404/light-404.png";
import { BaseContainer } from "@/components/layout/BaseContainer";
import { EXTERNAL_LINKS } from "@/constants/external";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

import styles from "./index.module.less";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isLight } = useCurrentTheme();

  const image404 = useMemo(() => {
    return isLight ? image404Light : image404Dark;
  }, [isLight]);

  return (
    <BaseContainer className={styles.wrapper}>
      <div className={styles.pic}>
        <img className="w-full h-full" src={image404} alt="404" />
      </div>
      <h1 className={styles.title}>{t("common:notFoundTitle")}</h1>
      <p className={styles.description}>
        {t("common:notFoundDescription")}{" "}
        <span
          className={styles.btn}
          onClick={() => {
            window.location.href = window.location.href;
          }}
        >
          {t("common:refreshing")}
        </span>{" "}
        {t("common:thePageOr")}{" "}
        <span
          className={styles.btn}
          onClick={() => navigate("/", { replace: true })}
        >
          {t("common:returnHemo")}
        </span>
        .
      </p>

      <a
        className={styles.goToContact}
        href={EXTERNAL_LINKS.dashboard + i18n.language + "/community"}
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        {t("common:contactUsForFurtherAssistance")}
      </a>
    </BaseContainer>
  );
};
