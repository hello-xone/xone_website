import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import CopyIcon from "@/assets/svg/home/copy.svg?react";
import { useCopy } from "@/hooks/useCopy";

const BusinessCard = () => {
    const { copy } = useCopy();
    const { t } = useTranslation();
    return (
        <div className="text-t2 leading-[140%] h-full text-[14px]">
            <div className="mb-3 font-bold">{t("common:contactUsForFurtherAssistance")}</div>
            <div className="flex items-center gap-[12px]">
                <span>business@xone.org</span>
                <CopyIcon onClick={() => {
                    copy("business@xone.org");
                }} className="w-[24px] h-[24px] cursor-pointer" />
            </div>
            <div className="flex items-center gap-[12px]">
                <span>labs@xone.org</span>
                <CopyIcon onClick={() => {
                    copy("labs@xone.org");
                }} className="w-[24px] h-[24px] cursor-pointer" />
            </div>
            <div className="mt-8 mb-3 font-bold">{t("common:navGlobalBusinessKit")}</div>
            <div className="flex items-center gap-[32px]">
                <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="hover:text-[--link1]"
                    href="https://docs.xone.org/study/media#our-logo"
                >
                    {t("common:navGlobalBusinessItem1")}
                </a>
                <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="hover:text-[--link1]"
                    href="https://docs.xone.org/study/media#our-color"
                >
                    {t("common:navGlobalBusinessItem2")}
                </a>
                <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="hover:text-[--link1]"
                    href="https://docs.xone.org/study/media#our-font"
                >
                    {t("common:navGlobalBusinessItem3")}
                </a>
                <a
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="hover:text-[--link1]"
                    href="https://docs.xone.org/study/media#our-coin"
                >
                    {t("common:navGlobalBusinessItem4")}
                </a>
            </div>
        </div>
    );
};

export default BusinessCard;
