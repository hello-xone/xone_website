import { useTranslation } from "react-i18next";

import ProjectCard from "./ProjectCard";

export default function CaseStudy() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:gap-y-[35px] gap-y-[32px] mt-[90px] md:mt-[160px]">
      <h2 className="md:text-[48px] text-[24px] font-bold text-[var(--t1)] text-left md:text-center">
        {t("lab:caseStudyTitle")}
      </h2>
      <div className="horizontal-scroll">
        <div className="flex gap-x-[24px] mb-[15px] min-w-fit">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProjectCard key={index} isShowTime />
          ))}
        </div>
      </div>
      <div className="mt-[10px] md:mt-[30px] w-fit mx-auto bg-[var(--t1)] text-t5 font-medium text-[14px] text-center rounded-[8px] px-[16px] py-[12px] cursor-pointer hover:bg-[var(--b10)]">
        {t("lab:viewMore")}
      </div>
    </div>
  );
}
