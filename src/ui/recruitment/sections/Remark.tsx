import { useTranslation } from "react-i18next";

export const Remark = () => {
  const { t } = useTranslation();

  return (
    <div className="mt-16 mb-[110px] flex flex-col gap-y-[24px]">
      <p className="text-[var(--t6)] text-[14px] font-normal leading-[1.6]">
        {t("recruitment:remark1")}
      </p>
      <p className="text-[var(--t6)] text-[14px] font-normal leading-[1.6]">
        {t("recruitment:remark2")}
      </p>
      <p className="text-[var(--t6)] text-[14px] font-normal leading-[1.6]">
        {t("recruitment:remark3")}
        <a
          href="mailto:support@xone.org"
          className="text-[var(--link1)] ml-1 cursor-pointer underline hover:text-[var(--link2)] transition-colors duration-200"
          target="_self"
          rel="noopener noreferrer"
        >
          support@xone.org
        </a>
      </p>
    </div>
  );
};
