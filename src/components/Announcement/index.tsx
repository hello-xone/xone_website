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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // 初始化公告数据
  useEffect(() => {
    // 使用前3条公告作为轮播数据
    if (announcementData.list && announcementData.list.length > 0) {
      setAnnouncements(announcementData.list);
    }
  }, []);

  // 监听窗口尺寸变化
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // 初始化窗口尺寸
    handleResize();

    // 添加事件监听器
    window.addEventListener('resize', handleResize);

    // 清理事件监听器
    return () => window.removeEventListener('resize', handleResize);
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
    if (currentSlide < announcements.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  };

  // 判断是否可以前进/后退
  const canGoNext = currentSlide < announcements.length - 1;
  const canGoPrev = currentSlide > 0;

  // 判断是否需要全屏适配
  const isDesktop = windowSize.width >= 768;
  const maxModalWidth = isDesktop ? 1720 : 860; // PC端1720px，移动端860px
  const maxModalHeight = isDesktop ? 900 : 600; // 预估的弹窗高度
  
  const needFullscreen = isDesktop && (
    windowSize.width < maxModalWidth + 10 || // 留10px边距
    windowSize.height < maxModalHeight + 10
  );

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

    if (isLeftSwipe && canGoNext) {
      nextSlide();
    } else if (isRightSwipe && canGoPrev) {
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
      <div className={clsx(
        "flex fixed inset-0 z-[9999]",
        needFullscreen 
          ? "items-stretch p-0 justify-stretch" 
          : "justify-end items-end md:items-center md:justify-center md:p-4"
      )}>
        <div
          className={clsx(
            "relative mx-auto shadow-2xl transition-all duration-300 ease-out transform bg-b1 animate-in fade-in-0 zoom-in-95 swipe-container",
            needFullscreen 
              ? "w-full h-full rounded-none fullscreen" 
              : "w-full rounded-t-2xl max-w-[860px] md:max-w-[1720px] md:rounded-2xl"
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

          {/* 左箭头 */}
          <button
            onClick={prevSlide}
            disabled={!canGoPrev}
            className={clsx(
              "hidden absolute top-0 bottom-0 left-6 m-auto md:flex justify-center items-center w-8 h-8 rounded-full carousel-nav-btn border border-solid transition-all duration-200",
              canGoPrev
                ? "border-[#A0A3A7] hover:bg-[#DFE0E2] hover:border-[#A0A3A7] cursor-pointer"
                : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            <ArrowIcon />
          </button>

          {/* 右箭头 */}
          <button
            onClick={nextSlide}
            disabled={!canGoNext}
            className={clsx(
              "hidden absolute top-0 bottom-0 right-6 m-auto md:flex justify-center items-center w-8 h-8 rounded-full carousel-nav-btn border border-solid transition-all duration-200",
              canGoNext
                ? "border-[#A0A3A7] hover:bg-[#DFE0E2] hover:border-[#A0A3A7] cursor-pointer"
                : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
            )}
          >
            <ArrowIcon className="rotate-180" />
          </button>

          {/* 内容区域 */}
          <div className={clsx(
            "flex flex-col h-full",
            needFullscreen 
              ? "p-4 pt-6" 
              : "p-4 pt-6 md:pt-12 md:p-12"
          )}>
            {/* 公告标题 */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-center text-t1">{ t("common:announcement") }</h2>
            </div>

            {/* 内容 */}
            <div className="flex flex-col flex-1 justify-between align-center">
                <div
                  className={clsx(
                    "overflow-y-auto pt-1 mb-3 font-normal text-left whitespace-normal break-words announcement-scrollbar text-[15px] carousel-content text-t1 rich-text-content",
                    needFullscreen 
                      ? "flex-1 min-h-0 md:pt-0 md:mb-4" 
                      : "h-[460px] md:h-[768px] md:mx-10 md:pt-0 md:mb-4"
                  )}
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
