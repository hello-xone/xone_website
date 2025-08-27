import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { BaseContainer } from "@/components/layout/BaseContainer";
import { EXTERNAL_LINKS } from "@/constants/external";

import styles from "./index.module.less";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  return (
    <BaseContainer className={styles.wrapper}>
      <div className={styles.pic}></div>
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
        rel="noopener noreferrer"
      >
        {t("common:contactUsForFurtherAssistance")}
      </a>
    </BaseContainer>
  );
};
