import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FAQItem {
  title: string;
  description: string;
}

export const CommonProblem = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(); // 默认打开第一个问题

  const faqList: FAQItem[] = [
    {
      title: t("grants:faqQuestion1Title"),
      description: t("grants:faqQuestion1Desc"),
    },
    {
      title: t("grants:faqQuestion2Title"),
      description: t("grants:faqQuestion2Desc"),
    },
    {
      title: t("grants:faqQuestion3Title"),
      description: t("grants:faqQuestion3Desc"),
    },
    {
      title: t("grants:faqQuestion4Title"),
      description: t("grants:faqQuestion4Desc"),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-[60px] md:mt-[160px]">
      <h2 className="text-[var(--t1)] text-[24px] md:text-[48px] font-bold">
        {t("grants:faqTitle")}
      </h2>
      <div className="mt-[20px] md:mt-[30px] border border-[var(--b3)] rounded-[8px]">
        {faqList.map((item, index) => (
          <div
            key={index}
            className={clsx(
              "px-[20px] cursor-pointer transition-all duration-300",
              {
                "border-t border-t-[var(--b3)]": index !== 0,
              }
            )}
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center h-[60px]">
              <h3 className="text-[var(--t1)] md:text-[19px] text-[16px] font-semibold pr-4">
                {item.title}
              </h3>
              <div className="flex-shrink-0">
                <svg
                  className={`w-[16px] h-[16px] text-[var(--t1)] transition-transform duration-300 ${
                    openIndex === index ? "rotate-[0deg]" : "rotate-[-90deg]"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index
                  ? "max-h-[1000px] opacity-100 pb-[20px]"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                <div
                  className="text-[var(--t2)] text-[14px] md:text-[16px] leading-[1.6] whitespace-pre-line"
                  dangerouslySetInnerHTML={{
                    __html: item.description.replace(/\n/g, "<br/>"),
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
