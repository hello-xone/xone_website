import { useTranslation } from "react-i18next";

import ArrowRightLine from "@/assets/svg/lab/arrow-right-line.svg?react";

interface ProjectCardProps {
  isNameTag?: boolean;
  isShowTime?: boolean;
}

export default function ProjectCard({
  isNameTag,
  isShowTime,
}: ProjectCardProps) {
  const { t } = useTranslation();
  return (
    <div className="md:w-[448px] w-[270px] h-full cursor-pointer bg-[var(--b2)] rounded-[16px] md:p-[24px] p-[16px] flex flex-col gap-y-[22px] border-[1px] border-transparent hover:border-[var(--t1)] border-solid">
      <div className="w-full md:h-[240px] h-[142px] rounded-[8px] bg-[var(--layer3)]"></div>
      <div className="flex flex-col gap-y-[10px]">
        {isNameTag && (
          <div className="h-[32px] w-fit box-border flex items-center justify-center px-[8px] py-[2px] bg-[var(--layer3)] rounded-[4px] color-[var(--t1)] text-[12px] font-normal">
            项目名称
          </div>
        )}
        {isShowTime && (
          <p className="text-[16px] font-normal text-t3">2024-09-27</p>
        )}
        <h1 className="md:text-[24px] text-[20px] font-bold color-[var(--t1)] line_clamp_2 md:overflow-hidden md:text-ellipsis md:whitespace-nowrap">
          TitleTitleTitleTitleTitleTitleTitleTitle
        </h1>
        <p className="text-[16px] font-normal color-[var(--t1)] line_clamp_3">
          TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText
        </p>
      </div>
      <div className="mt-[5px] w-fit flex items-center gap-x-[4px] color-[var(--t1)] hover:text-[var(--link1)]">
        <span className="text-[16px] font-medium">{t("lab:viewDetails")}</span>
        <ArrowRightLine className="w-[24px] h-[24px]" />
      </div>
    </div>
  );
}
