import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import CopyIcon from "@/assets/svg/home/copy.svg?react";
import EmailIcon from "@/assets/svg/home/email.svg?react";
import { Title } from "@/components/comm/title";
import { useCopy } from "@/hooks/useCopy";

const businessEmail = "business@xone.org";
const labEmail = "labs@Xone.org";
export const Commercial = () => {
  const { copy } = useCopy();

  const { t } = useTranslation("commercial")
  return (
    <div className="container !pb-[80px] md:!pb-[120px] text-center">
      <Title className="mt-[40px] md:mt-[116px] max-md:!text-[32px] !leading-[38px] !font-bold md:!leading-[63px] !mb-0">{t("bannerTitle1")}</Title>
      <Title className="!leading-[38px] md:!leading-[63px] max-md:!text-[32px] !font-bold">{t("bannerTitle2")}</Title>
      <div className="text-t2 text-base md:text-xl leading-[140%] mb-8">{t("bannerDesc")}</div>
      <div className="flex max-md:flex-col items-center text-t2 text-base leading-[22px] justify-center gap-[16px]">
        <Link to={`mailto:${businessEmail}`} className="bg-b3 p-[12px] cursor-pointer flex gap-[8px] items-center w-full md:w-[349px] rounded-[8px] relative">
          <EmailIcon className="w-6 h-6"></EmailIcon>
          <span>{businessEmail}</span>
          <CopyIcon onClick={() => {
            copy(businessEmail);
          }} className="w-[24px] h-[24px] cursor-pointer absolute top-3 right-3" />
        </Link>
        <Link to={`mailto:${labEmail}`} className="bg-b3 p-[12px] cursor-pointer flex gap-[8px] items-center w-full md:w-[349px] rounded-[8px] relative">
          <EmailIcon className="w-6 h-6"></EmailIcon>
          <span>{labEmail}</span>
          <CopyIcon onClick={() => {
            copy(labEmail);
          }} className="w-[24px] h-[24px] cursor-pointer absolute top-3 right-3" />
        </Link>
      </div>
    </div>
  );
};
