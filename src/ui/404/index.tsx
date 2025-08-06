import { BaseContainer } from "@/components/layout/BaseContainer";
import styles from "./index.module.less";
import picture from "@/assets/imgs/404/404.png";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { EXTERNAL_LINKS } from "@/constants/external";

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t,i18n } = useTranslation();
  return (
    <BaseContainer className={styles.wrapper}>
      <div className={styles.left}>
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

        <p className={styles.description}>
          <a
            className={styles.btn}
            href={EXTERNAL_LINKS.dashboard + i18n.language + "/community"}
            target="_blank"
            rel="noopener noreferrer"
            
          >
          {t("common:contactUsForFurtherAssistance")}
          </a>{" "}
          {t("common:help")}
        </p>
      </div>
      <div className={styles.pic}>
        <img className="w-full" src={picture} alt="" />
      </div>
    </BaseContainer>
  );
};
