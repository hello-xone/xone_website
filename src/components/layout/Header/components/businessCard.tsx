import { useTranslation } from "react-i18next";

import CopyIcon from "@/assets/svg/home/copy.svg?react";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { useCopy } from "@/hooks/useCopy";

const BusinessCard = ({
  group,
  onClose,
}: {
  group: any;
  onClose?: () => void;
}) => {
  const { copy } = useCopy();
  const { t } = useTranslation("header");

  if (!group) return null;

  return (
    <div className="flex flex-col flex-1 gap-y-[35px] w-[507px] pb-[16px]">
      {group.mainIcon && (
        <img src={group.mainIcon} alt="" className="w-full h-[380px]" />
      )}
      <div className="flex flex-col gap-y-[30px]">
        <div className="flex flex-col gap-y-[8px]">
          <h3 className="font-bold text-t2">{t("contact")}</h3>
          <div className="flex gap-x-[20px]">
            <div className="flex items-center gap-[6px]">
              <span className="text-t2 text-[14px]">business@xone.org</span>
              <CopyIcon
                onClick={() => {
                  copy("business@xone.org");
                }}
                className="w-[24px] h-[24px] text-t2 cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-[6px]">
              <span className="text-t2 text-[14px]">labs@xone.org</span>
              <CopyIcon
                onClick={() => {
                  copy("labs@xone.org");
                }}
                className="w-[24px] h-[24px] cursor-pointer text-t2"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-[12px]">
          <h3 className="font-bold text-t2">{t("navGlobalBusinessKit")}</h3>
          <div className="flex items-center gap-[32px] text-[14px] text-t2">
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hover:text-[--link1]"
              href="https://docs.xone.org/study/media#our-logo"
              onClick={onClose}
            >
              {t("navGlobalBusinessItem1")}
            </a>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hover:text-[--link1]"
              href="https://docs.xone.org/study/media#our-color"
              onClick={onClose}
            >
              {t("navGlobalBusinessItem2")}
            </a>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hover:text-[--link1]"
              href="https://docs.xone.org/study/media#our-font"
              onClick={onClose}
            >
              {t("navGlobalBusinessItem3")}
            </a>
            <a
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hover:text-[--link1]"
              href="https://docs.xone.org/study/media#our-coin"
              onClick={onClose}
            >
              {t("navGlobalBusinessItem4")}
            </a>
          </div>
        </div>
        <div className="w-fit">
          <SeeMore
            textClassName="!text-[14px] !font-normal"
            href={group.moreLink}
            text={t("viewMore")}
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
