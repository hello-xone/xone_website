import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import LocationIcon from "@/assets/svg/recruitment/detail/location.svg?react";
import PositionIcon from "@/assets/svg/recruitment/detail/position.svg?react";
import TimeIcon from "@/assets/svg/recruitment/detail/time.svg?react";
import IconWarning from "@/assets/svg/recruitment/warning.svg";
import type { BreadcrumbItem } from "@/components/comm/breadcrumb";
import { Breadcrumb } from "@/components/comm/breadcrumb";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";
import { useJobDetail } from "@/hooks/useJobDetail";

export const Detail = () => {
  const { t } = useTranslation();
  const { id } = useParams();

  const navigate = useNavigate();
  const { isLight } = useCurrentTheme();

  // 使用hook获取职位详情
  const { job, error } = useJobDetail(id);

  const breadcrumbItems = [
    {
      label: t("recruitment:breadcrumb.recruitment"),
      path: "/recruitment",
    },
    {
      label: job?.title || t("recruitment:breadcrumb.jobDetails"),
      isActive: true,
    },
  ];

  const handleItemClick = (item: BreadcrumbItem, index: number) => {
    if (item.path && !item.isActive) {
      navigate(-1);
    }
  };

  // 错误状态
  if (error || !job) {
    return (
      <div className="container">
        <div className="mt-10 text-center">
          <div className="text-[var(--error)] text-6xl mb-4">⚠️</div>
          <h2 className="text-[var(--t1)] text-2xl font-bold mb-2">
            {t("recruitment:notFound.title")}
          </h2>
          <p className="text-[var(--t2)] mb-6">
            {t("recruitment:notFound.description")}
          </p>
          <button
            onClick={() => navigate("/recruitment")}
            className="px-6 py-3 bg-[var(--primary)] text-white rounded-lg hover:opacity-80 transition-opacity"
          >
            {t("recruitment:notFound.button")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="mt-10">
        <Breadcrumb
          items={breadcrumbItems}
          separator="/"
          className="mb-9"
          onItemClick={handleItemClick}
        />
        <div
          className={clsx(
            "w-full flex items-center gap-[10px] px-[24px] py-[16px] rounded-[8px]",
            isLight ? "bg-[#FFF5E8]" : "bg-[#2E1F16]"
          )}
        >
          <img className="w-[20px] h-[20px]" src={IconWarning} alt="warning" />
          <p className="text-[var(--t1)] text-[14px] font-normal">
            {t("recruitment:detail.warningDesc")}
          </p>
        </div>

        {Array.isArray(job.workType) && job.workType.length > 0 && (
          <div className="flex flex-wrap gap-8 mt-8">
            {job.workType.map((type, index) => (
              <div
                key={index}
                className={clsx(
                  "px-[8px] py-[5px] rounded-[8px] font-normal text-[12px]",
                  "text-[var(--primary)]",
                  isLight ? "bg-[#FFE7E6]" : "bg-[#201010]",
                  isLight ? "text-[#FF4D4F]" : "text-[#D90021]"
                )}
              >
                {type}
              </div>
            ))}
          </div>
        )}

        <h3 className="text-[var(--t1)] mt-3 text-[32px] md:text-[40px] font-bold">
          {job.title}
        </h3>

        <div className="flex flex-col gap-y-[10px] mt-6">
          <div className="flex items-center gap-x-[8px]">
            <TimeIcon className="w-[20px] h-[20px] text-[var(--t1)]" />
            <p className="text-[var(--t1)] text-[17px] mt-1">
              {job.publishDate}
            </p>
          </div>
          <div className="flex items-center gap-x-[8px]">
            <PositionIcon className="w-[20px] h-[20px] text-[var(--t1)]" />
            <p className="text-[var(--t1)] text-[17px] mt-1">
              {Array.isArray(job.location)
                ? job.location.join(" - ")
                : job.location}
            </p>
          </div>
          <div className="flex items-center gap-x-[8px]">
            <LocationIcon className="w-[20px] h-[20px]" />
            <p className="text-[var(--t1)] text-[17px] mt-1">{job.company}</p>
          </div>
        </div>

        <a
          href="mailto:job@xone.org"
          target="_blank"
          className="inline-block text-center mt-10 px-[20px] py-[16px] rounded-[12px] bg-[var(--t1)] text-[var(--b1)] text-[18px] font-medium hover:bg-[var(--b10)]"
        >
          {t("recruitment:detail.applyNow")}
        </a>

        <div className="mt-14 mb-[120px]">
          <div className="max-w-none text-[var(--t1)]">
            <div
              dangerouslySetInnerHTML={{ __html: job.content }}
              className="[&>h1]:text-3xl [&>h1]:font-bold [&>h1]:mt-10 [&>h1]:mb-6 [&>h1]:text-[var(--t1)] [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-[var(--t1)] [&>h3]:text-xl [&>h3]:font-semibold [&>h3]:mt-6 [&>h3]:mb-3 [&>h3]:text-[var(--t1)] [&>p]:mb-2 [&>p]:text-[var(--t2)] [&>p]:leading-[1.8] [&>ul]:list-disc [&>ul]:ml-6 [&>ul]:mb-4 [&>li]:mb-2 [&>li]:text-[var(--t2)] [&>code]:bg-[var(--b3)] [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>pre]:bg-[var(--b3)] [&>pre]:p-4 [&>pre]:rounded-lg [&>pre]:overflow-x-auto [&>pre]:mb-4 [&>a]:text-[var(--primary)] [&>a]:hover:underline [&>strong]:font-semibold [&>strong]:text-[var(--t1)] [&>em]:italic"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
