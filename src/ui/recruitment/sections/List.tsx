import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ArrowRightLineDarkIcon from "@/assets/svg/recruitment/arrow-right-line-dark.svg?react";
import ArrowRightLineLightIcon from "@/assets/svg/recruitment/arrow-right-line-light.svg?react";
import LocationIcon from "@/assets/svg/recruitment/home/location.svg?react";
import PositionIcon from "@/assets/svg/recruitment/home/position.svg?react";
import Empty from "@/components/comm/Empty";
import { useCurrentTheme } from "@/hooks/useCurrentTheme";

// 预加载所有 job 图片
const jobImages = import.meta.glob("@/assets/job/image/**/*.png", {
  eager: true,
});

export const List = ({ data, onMore }: { data: any; onMore: () => void }) => {
  const { isLight } = useCurrentTheme();
  const { t } = useTranslation();

  // 获取图片 URL 的函数
  const getImageUrl = (logoPath: string) => {
    const fullPath = `/src/assets${logoPath}`;
    const imageModule = jobImages[fullPath] as { default: string } | undefined;
    return imageModule?.default || "";
  };

  return (
    <div className="mt-8">
      <p className="text-[20px] md:text-[22px] text-[var(--t1)] font-light">
        {t("recruitment:showing")}
        <span className="mx-2 font-bold">{data.totalCount}</span>
        {t("recruitment:jobs")}
      </p>
      <div className="mt-8 flex flex-col gap-y-[24px]">
        {data.list.map((item: any) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row md:items-center justify-start md:justify-between bg-[var(--b2)] rounded-[16px] p-[24px]"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-x-[24px]">
              <img
                src={getImageUrl(item.logo)}
                alt={item.title}
                className="w-[100px] h-[100px] object-scale-down"
              />
              <div className="flex flex-col">
                <p className="mt-2 md:mt-0 text-[var(--t2)] text-[16px]">
                  {item.publishDate}
                </p>
                <h3 className="text-[var(--t1)] text-[24px] font-bold mt-[6px]">
                  {item.title}
                </h3>
                <div className="flex md:items-center items-start md:flex-row flex-col mt-[6px] md:mt-[8px] gap-x-[24px] gap-y-[4px] md:gap-y-[8px]">
                  <div className="flex items-center gap-x-[6px]">
                    <PositionIcon className="w-[18px] h-[18px]" />
                    <p className="text-[var(--t2)] text-[15px] mt-[1px]">
                      {item.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-[5px]">
                    <LocationIcon className="w-[18px] h-[18px]" />
                    <p className="text-[var(--t2)] text-[15px] mt-[4px]">
                      {item.location.join(" - ")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-x-[8px] mt-[14px]">
                  {item.workType.map((type: string, index: number) => (
                    <div
                      key={index}
                      className={clsx(
                        "h-[32px] flex items-center justify-center px-[8px] py-[5px] rounded-[8px] font-normal text-[12px] w-fit",
                        "text-[var(--primary)]",
                        isLight ? "bg-[#FFE7E6]" : "bg-[#201010]",
                        isLight ? "text-[#FF4D4F]" : "text-[#D90021]"
                      )}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <Link
              to={`/recruitment-detail/${item.id}`}
              className="flex items-center justify-center gap-x-[6px] cursor-pointer mt-5 md:mt-0 w-full md:w-[140px] bg-[var(--t1)] rounded-[8px] px-[16px] py-[8px] text-[14px] text-[var(--b1)]"
            >
              {t("recruitment:details")}
              {isLight ? (
                <ArrowRightLineLightIcon className="w-[24px] h-[24px]" />
              ) : (
                <ArrowRightLineDarkIcon className="w-[24px] h-[24px]" />
              )}
            </Link>
          </div>
        ))}
      </div>
      {data.hasMore && (
        <p
          className="text-[var(--t2)] text-[15px] mt-6 text-center mx-auto cursor-pointer w-[80px]"
          onClick={onMore}
        >
          {t("recruitment:viewMore")}
        </p>
      )}
      {data.list.length === 0 && (
        <Empty />
      )}
    </div>
  );
};
