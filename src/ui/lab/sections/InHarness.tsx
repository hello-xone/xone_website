import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import inHarnessDark from "@/assets/imgs/lab/dark/harness.png";
import inHarnessLight from "@/assets/imgs/lab/light/harness.png";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

export default function InHarness() {
  const { t } = useTranslation();
  const { isLight } = useCurrentTheme();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/events");
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between md:items-center items-start mt-[120px] md:mt-[160px]">
      <div className="flex flex-col gap-y-[32px]">
        <div className="flex flex-col md:gap-y-[18px] gap-y-[16px]">
          <h2 className="md:text-[48px] text-[24px] font-bold text-[var(--t1)]">
            {t("lab:inHarnessTitle")}
          </h2>
          <p className="md:text-[20px] text-[16px] text-[var(--t1)] font-normal">
            {t("lab:inHarnessDesc")}
          </p>
        </div>
        <div
          className="w-fit bg-[var(--t1)] text-t5 font-medium text-[14px] text-center rounded-[8px] px-[16px] py-[12px] cursor-pointer hover:bg-[var(--b10)]"
          onClick={handleButtonClick}
        >
          {t("lab:inHarnessButton")}
        </div>
      </div>
      <img
        className="block w-[380px] h-[221px] md:w-[324px] md:h-[184px] md:mt-[88px] mt-[0] md:mx-0 mx-auto md:mb-0 mb-[35px]"
        src={isLight ? inHarnessLight : inHarnessDark}
        alt="inHarness"
      />
    </div>
  );
}
