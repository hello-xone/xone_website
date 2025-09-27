import "./styles.css";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import announcementData from "@/announcement/list.json";
import ArrowIcon from "@/assets/svg/home/announcement_caret.svg?react";
import CloseIcon from "@/assets/svg/home/announcement_close.svg?react";

// 公告数据类型
interface AnnouncementItem {
  meta: {
    id: number;
    title: string;
    date: string;
    summary: string;
    show: boolean; // 是否显示公告
    moreLink?: string | null; // 如果是null，则不显示Learn More按钮
  };
  content: string;
  slug: string;
  readingTime: number;
}

const Announcement = () => {
  const { t } = useTranslation();
  
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);

  // 初始化公告数据
  useEffect(() => {
    // 使用前3条公告作为轮播数据
    if (announcementData.list && announcementData.list.length > 0) {
      setAnnouncements(announcementData.list);
    }
  }, []);

  useEffect(() => {
    // 检查是否已经显示过公告
    const hasShownAnnouncement = localStorage.getItem("announcement_shown");

    if (!hasShownAnnouncement && announcements.length > 0) {
      // 延迟一点显示，让页面加载完成
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [announcements]);

  // 控制页面滚动
  useEffect(() => {
    if (isVisible) {
      // 弹窗显示时禁用页面滚动
      document.body.style.overflow = "hidden";
    } else {
      // 弹窗关闭时恢复页面滚动
      document.body.style.overflow = "unset";
    }

    // 组件卸载时恢复滚动
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    // 记录已经显示过公告
    localStorage.setItem("announcement_shown", "true");
  };

  const handleLearnMore = () => {
    const currentItem = announcements[currentSlide];
    if (currentItem) {
      // 优先使用 moreLink 字段
      if (currentItem.meta.moreLink) {
        window.open(currentItem.meta.moreLink, "_blank");
        return;
      }
    }
  };

  // 轮播控制函数
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + announcements.length) % announcements.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // 获取当前轮播项
  const currentItem = announcements[currentSlide];

  // 如果没有数据，不显示组件
  if (!isVisible || !currentItem) return null;

  // 触摸事件处理
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0); // 重置touchEnd
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  if (announcements.length === 0) return null;

  return (
    <>

      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        onClick={handleClose}
      />

      {/* 弹窗内容 */}
      <div className="fixed inset-0 flex md:items-center md:justify-center justify-end items-end z-[9999] md:p-4">
        <div
          className={clsx(
            "relative mx-auto rounded-t-2xl shadow-2xl md:rounded-2xl bg-b1",
            "transition-all duration-300 ease-out transform",
            "animate-in fade-in-0 zoom-in-95 w-[860px] swipe-container"
          )}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* 关闭按钮 */}
          <button
            onClick={handleClose}
            className="flex absolute top-4 right-5 z-40 justify-center items-center w-8 h-8 rounded-full transition-colors cursor-pointer text-t2"
          >
            <CloseIcon className="w-[24px] h-[24px]" />
          </button>

          {/* 轮播导航 */}
          <div className="hidden absolute top-0 bottom-0 right-6 left-6 justify-between items-center m-auto h-16 md:flex">
            {/* 左箭头 */}
            <button
              onClick={prevSlide}
              className="flex justify-center items-center w-8 h-8 rounded-full carousel-nav-btn border border-[#A0A3A7] border-solid hover:bg-[#DFE0E2] hover:border-[#A0A3A7]"
            >
              <ArrowIcon />
            </button>

            {/* 右箭头 */}
            <button
              onClick={nextSlide}
              className="flex justify-center items-center w-8 h-8 rounded-full carousel-nav-btn border border-[#A0A3A7] border-solid hover:bg-[#DFE0E2] hover:border-[#A0A3A7]"
            >
              <ArrowIcon className="rotate-180" />
            </button>
          </div>

          {/* 内容区域 */}
          <div className="p-4 pt-6 md:pt-8 md:p-6">
            {/* 公告标题 */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-center text-t1">{ t("common:announcement") }</h2>
            </div>

            {/* 内容 */}
            <div className="flex flex-col justify-between align-center">
              <div
                className="overflow-y-auto pt-1 mb-3 h-[460px] md:h-96 md:mx-10 md:pt-0 md:mb-4 announcement-scrollbar text-[15px] font-normal text-left whitespace-normal break-words carousel-content text-t1 rich-text-content"
                dangerouslySetInnerHTML={{ __html: currentItem.content }}
              />

              {/* 指示器 */}
              <div className={clsx("flex justify-center items-center space-x-2", currentItem.meta.moreLink && "mb-4")}>
                {announcements.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={clsx(
                      "carousel-indicator w-2 h-2 rounded-full",
                      currentSlide === index
                        ? " bg-black w-[12px] h-[7px]"
                        : "bg-gray-300"
                    )}
                  />
                ))}
              </div>
            </div>

            {
              currentItem.meta.moreLink && (
                <div className="flex">
                  <button
                    onClick={handleLearnMore}
                    className="px-4 py-3 w-full font-medium text-center text-white bg-black rounded-lg transition-colors hover:bg-gray-800"
                  >
                    { t("common:learnMore") }
                  </button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Announcement;
