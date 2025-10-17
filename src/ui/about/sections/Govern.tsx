import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import GovernIcon from "@/assets/imgs/about/govern.png";

export default function Govern() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const list = [
    {
      title: t("about:governListTitle01"),
      desc: t("about:governListDesc01"),
    },
    {
      title: t("about:governListTitle02"),
      desc: t("about:governListDesc02"),
    },
    {
      title: t("about:governListTitle03"),
      desc: t("about:governListDesc03"),
    },
  ];

  const handleButtonClick = () => {
    navigate("/compliance");
  };

  return (
    <div className="mt-[40px] md:mt-[160px]">
      <h2 className="md:text-[48px] text-[24px] font-bold text-[var(--t1)]">
        {t("about:governTitle")}
      </h2>
      <p className="mt-[20px] md:mt-[34px] text-[16px] font-normal text-[var(--t1)]">
        {t("about:governDesc")}
      </p>
      <div className="mt-[24px] md:mt-[35px] flex flex-col md:flex-row gap-[16px] md:gap-[24px]">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex md:flex-col flex-row flex-1 bg-[var(--b2)] rounded-[16px] p-[24px] pt-[20px] gap-[24px] md:gap-[0] items-center md:items-start"
          >
            <img
              className="block w-[54px] h-[54px]"
              src={GovernIcon}
              alt={item.title}
            />
            <div className="flex flex-col md:gap-[13px] gap-[16px] md:mt-[8px] mt-[0]">
              <h3 className="md:text-[24px] text-[20px] font-bold text-[var(--t1)]">
                {item.title}
              </h3>
              <p className="text-[16px] font-normal text-[var(--t2)]">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-[40px] w-fit mx-auto bg-[var(--t1)] text-t5 font-medium text-[14px] text-center rounded-[8px] cursor-pointer hover:bg-[var(--b10)] px-[16px] py-[11px]"
        onClick={handleButtonClick}
      >
        {t("about:governListButton")}
      </div>
    </div>
  );
}
