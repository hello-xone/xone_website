import { useTranslation } from "react-i18next";

import describeDark from "@/assets/imgs/lab/dark/describe.png";
import describeLight from "@/assets/imgs/lab/light/describe.png";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

export default function Describe() {
  const { t } = useTranslation();
  const { isLight } = useCurrentTheme();

  return (
    <div className="mt-[75px] md:mt-[150px] flex flex-col-reverse md:flex-row justify-around items-center">
      <img
        className="flex-1 md:max-w-[488px] max-w-[345px] md:h-[327px] h-[245px] md:mt-0 mt-[46px]"
        src={isLight ? describeLight : describeDark}
      />
      <div className="w-full md:w-auto flex flex-col md:gap-y-[40px] gap-y-[16px]">
        <div className="flex flex-col md:gap-y-[24px] gap-y-[16px]">
          <h2
            className="hidden md:block text-t1 font-bold text-[48px] leading-[66px]"
            dangerouslySetInnerHTML={{ __html: t("lab:describeTitle") }}
          />
          <h2 className="md:hidden text-t1 font-bold text-[24px]">
            {t("lab:describeTitle").replace(/<br\s*\/?>/gi, " ")}
          </h2>
          <p className="text-t7 font-normal text-[16px]">
            {t("lab:describeSubTitle")}
          </p>
        </div>
        <div className="flex flex-col gap-y-[8px]">
          <p
            className="hidden md:block text-t1 font-normal text-[16px]"
            dangerouslySetInnerHTML={{ __html: t("lab:describeDesc01") }}
          />
          <p className="md:hidden text-t1 font-normal text-[16px]">
            {t("lab:describeDesc01").replace(/<br\s*\/?>/gi, " ")}
          </p>
          <p
            className="hidden md:block text-t1 font-normal text-[16px]"
            dangerouslySetInnerHTML={{ __html: t("lab:describeDesc02") }}
          />
          <p className="md:hidden text-t1 font-normal text-[16px]">
            {t("lab:describeDesc02").replace(/<br\s*\/?>/gi, " ")}
          </p>
          <p
            className="hidden md:block text-t1 font-normal text-[16px]"
            dangerouslySetInnerHTML={{ __html: t("lab:describeDesc03") }}
          />
          <p className="md:hidden text-t1 font-normal text-[16px]">
            {t("lab:describeDesc03").replace(/<br\s*\/?>/gi, " ")}
          </p>
          <p
            className="hidden md:block text-t1 font-normal text-[16px]"
            dangerouslySetInnerHTML={{ __html: t("lab:describeDesc04") }}
          />
          <p className="md:hidden text-t1 font-normal text-[16px]">
            {t("lab:describeDesc04").replace(/<br\s*\/?>/gi, " ")}
          </p>
        </div>
      </div>
    </div>
  );
}
