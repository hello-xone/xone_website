import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FAQItem {
  title: string;
  description: string;
}

// 富文本解析函数
const parseRichText = (text: string): string => {
  return (
    text
      // 处理引用段落 > text (去除 > 符号，连续引用合并为一个div) - 先处理
      .replace(/(^>\s*.*(?:\n^>\s*.*)*)/gm, (match) => {
        const content = match.replace(/^>\s*/gm, "").trim();
        return `<div class="border-l-4 border-[var(--b3)] pl-4 py-2 bg-[var(--b2)] rounded-r-md">${content}</div>`;
      })
      // 处理换行符
      .replace(/\n/g, "<br/>")
      // 规整多个连续的br标签为一个
      .replace(/(<br\/>){2,}/g, "<div class='mb-4'></div>")
      // 处理粗体 **text** 或 __text__
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="font-semibold text-[var(--t1)]">$1</strong>'
      )
      .replace(
        /__(.*?)__/g,
        '<strong class="font-semibold text-[var(--t1)]">$1</strong>'
      )
      // 处理斜体 *text* 或 _text_
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      .replace(/_(.*?)_/g, '<em class="italic">$1</em>')
      // 处理代码 `code`
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-[var(--b3)] px-2 py-1 rounded text-sm font-mono">$1</code>'
      )
      // 处理链接 [text](url)
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" class="text-[var(--primary)] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
      )
  );
};

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
              <div
                className="cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="text-[var(--t2)] text-[14px] md:text-[16px] leading-[2] [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:mt-4 [&>h1]:mb-3 [&>h1]:text-[var(--t1)] [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:mt-4 [&>h2]:mb-2 [&>h2]:text-[var(--t1)] [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:mt-4 [&>h3]:mb-2 [&>h3]:text-[var(--t1)] [&>li]:ml-4 [&>li]:mb-1 [&>code]:bg-[var(--b3)] [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm [&>code]:font-mono [&>strong]:font-semibold [&>strong]:text-[var(--t1)] [&>em]:italic [&>a]:text-[var(--primary)] [&>a]:hover:underline [&>div]:text-[var(--t2)] [&>div]:text-[14px] [&>div]:md:text-[16px]"
                  dangerouslySetInnerHTML={{
                    __html: parseRichText(item.description),
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
