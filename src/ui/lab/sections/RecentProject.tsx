import { useTranslation } from "react-i18next";

import ProjectCard from "./ProjectCard";

export default function RecentProject() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-y-[30px]">
      <div className="flex flex-col md:gap-y-[18px] gap-y-[14px]">
        <h2 className="md:text-[48px] text-[24px] font-bold text-[var(--t1)]">
          {t("lab:recentTitle")}
        </h2>
        <p className="text-[16px] text-[var(--t7)] font-normal">
          {t("lab:recentDesc")}
        </p>
      </div>
      <div className="horizontal-scroll">
        <div className="flex gap-x-[24px] mb-[15px] min-w-fit">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProjectCard key={index} isNameTag />
          ))}
        </div>
      </div>
    </div>
  );
}
