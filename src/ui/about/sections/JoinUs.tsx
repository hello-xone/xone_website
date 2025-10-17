import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function JoinUs() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/recruitment");
  };

  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-[45px] md:mt-[190px] mb-[10px] md:mb-[100px]">
      <div className="flex flex-col w-full md:w-auto md:gap-y-[32px] gap-y-[24px] md:pr-[30px] pr-[0]">
        <h2 className="md:text-[48px] text-[24px] font-bold text-[var(--t1)]">
          {t("about:joinUsTitle")}
        </h2>
        <div
          className="w-fit bg-[var(--t1)] text-t5 font-medium text-[14px] text-center rounded-[8px] cursor-pointer hover:bg-[var(--b10)] px-[16px] py-[11px]"
          onClick={handleButtonClick}
        >
          {t("about:joinUsButton")}
        </div>
      </div>
      <div className="md:w-[371px] w-full md:h-[225px] h-[232px] rounded-[8px] bg-[var(--b3)] mb-[24px] md:mb-[0]"></div>
    </div>
  );
}
