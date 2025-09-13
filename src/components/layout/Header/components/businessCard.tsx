import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import CopyIcon from "@/assets/svg/home/copy.svg?react";
import { useCopy } from "@/hooks/useCopy";

const BusinessCard = () => {
    const { copy } = useCopy();
    const { t } = useTranslation();
    return (
        <div className="text-t2 leading-[140%] h-full text-[14px]">
            <div className="font-bold mb-3">{t("common:contactUsForFurtherAssistance")}</div>
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
            <div className="font-bold mb-3 mt-8">{t("common:navGlobalBusinessKit")}</div>
            <div className="flex items-center gap-[32px]">
                <Link
                    target="_blank"
                    className="hover:text-[--link1]"
                    to="https://docs.xone.org/study/media#our-logo"
                >
                    {t("common:navGlobalBusinessItem1")}
                </Link>
                <Link
                    target="_blank"
                    className="hover:text-[--link1]"
                    to="https://docs.xone.org/study/media#our-color"
                >
                    {t("common:navGlobalBusinessItem2")}
                </Link>
                <Link
                    target="_blank"
                    className="hover:text-[--link1]"
                    to="https://docs.xone.org/study/media#our-font"
                >
                    {t("common:navGlobalBusinessItem3")}
                </Link>
                <Link
                    target="_blank"
                    className="hover:text-[--link1]"
                    to="https://docs.xone.org/study/media#our-coin"
                >
                    {t("common:navGlobalBusinessItem4")}
                </Link>
            </div>
        </div>
    );
};

export default BusinessCard;
