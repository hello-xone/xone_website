import { Skeleton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import ArrowBottomInline from "@/assets/svg/home/arrow-bottom-line.svg?react";
import { SeeMore } from "@/components/comm/link/SeeMore";
import { AnimationName, DelayClassName } from "@/hooks/useScrollreveal";

import styles from "./index.module.less";

enum Tag {
  ALL = "All",
  SDK = "SDK", // SDK 服务
  RPC = "RPC", // RPC 服务
  IDE = "IDE", // IDE
  EXPLORER = "Explorer", // 区块浏览器
  FAUCET = "Faucet", // 水龙头
  ANALYTICS = "Analytics", // 数据分析
  NODE = "Node Services", // 节点服务
  NFT = "NFT Related", // NFT 相关
  DATA = "Data Processing", // 数据处理
  BRIDGES = "Bridges", // 桥
  DAO = "DAO Related", // DAO 相关
  QUALITY = "Code Quality", // 代码质量
  FRONT = "Front-End", // 前端
  BACK = "Back-End", // 后端
  FRAMEWORK = "Framework", // 框架
  MPC = "MPC", // MPC
  ORACLE = "Oracle", // 甲骨文
  WALLET = "Wallet", // 钱包
  PAYMENT = "Payment Gateway", // 支付网关
  AUDIT = "Security Audit", // 安全审计
  STORAGE = "Storage", // 存储
}

export const Business = () => {
  const { t } = useTranslation();
  const [selectedTag, setSelectedTag] = useState<Tag>(Tag.ALL);
  const [toolList, setToolList] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(8);
  const [isExpanded, setIsExpanded] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // 检测是否为移动设备
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === 'undefined') return false;
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    };

    // 初始检测
    setIsMobile(checkMobile());

    // 监听窗口大小变化
    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/hello-xone/xone_assets/main/tools/ToolList.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setToolList(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch ToolList:", err);
        // setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const navData = useMemo(() => {
    return [
      {
        tag: Tag.ALL,
        name: t("developer:businessTag1"),
      },
      {
        tag: Tag.SDK,
        name: t("developer:businessTag2"),
      },
      {
        tag: Tag.RPC,
        name: t("developer:businessTag3"),
      },
      {
        tag: Tag.IDE,
        name: t("developer:businessTag4"),
      },
      {
        tag: Tag.EXPLORER,
        name: t("developer:businessTag5"),
      },
      {
        tag: Tag.FAUCET,
        name: t("developer:businessTag6"),
      },
      {
        tag: Tag.ANALYTICS,
        name: t("developer:businessTag7"),
      },
      {
        tag: Tag.NODE,
        name: t("developer:businessTag8"),
      },
      {
        tag: Tag.NFT,
        name: t("developer:businessTag9"),
      },
      {
        tag: Tag.DATA,
        name: t("developer:businessTag10"),
      },
      {
        tag: Tag.BRIDGES,
        name: t("developer:businessTag11"),
      },
      {
        tag: Tag.DAO,
        name: t("developer:businessTag12"),
      },
      {
        tag: Tag.QUALITY,
        name: t("developer:businessTag13"),
      },
      {
        tag: Tag.FRONT,
        name: t("developer:businessTag14"),
      },
      {
        tag: Tag.BACK,
        name: t("developer:businessTag15"),
      },
      {
        tag: Tag.FRAMEWORK,
        name: t("developer:businessTag16"),
      },
      {
        tag: Tag.MPC,
        name: t("developer:businessTag17"),
      },
      {
        tag: Tag.ORACLE,
        name: t("developer:businessTag18"),
      },
      {
        tag: Tag.WALLET,
        name: t("developer:businessTag19"),
      },
      {
        tag: Tag.PAYMENT,
        name: t("developer:businessTag20"),
      },
      {
        tag: Tag.AUDIT,
        name: t("developer:businessTag21"),
      },
      {
        tag: Tag.STORAGE,
        name: t("developer:businessTag22"),
      },
    ];
  }, [t]);

  const list = useMemo(
    () =>
      Object.entries(toolList).flatMap(([tag, items]) =>
        (items as any[]).map((item) => ({
          ...item,
          tags: [tag],
        }))
      ),
    [toolList]
  );

  const filterList = useMemo(() => {
    if (selectedTag === Tag.ALL) return list;
    return list.filter((item) => item.tags.includes(selectedTag));
  }, [selectedTag, list]);

  // 获取当前显示的项目列表
  const displayList = useMemo(() => {
    if (isExpanded) {
      return filterList; // 展开时显示所有项目
    }
    return filterList.slice(0, displayCount); // 收起时只显示指定数量
  }, [filterList, displayCount, isExpanded]);

  // 检查是否应该显示展开/收起按钮
  const shouldShowToggleButton = useMemo(() => {
    // 如果数据还在加载中，不显示按钮
    if (isLoading) return false;

    // 如果数据总数少于等于初始显示数量，不显示按钮
    if (filterList.length <= displayCount) return false;

    return true;
  }, [isLoading, filterList.length, displayCount]);

  // 处理展开/收起按钮点击
  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  // 当切换tab时重置显示数量和展开状态
  useEffect(() => {
    setDisplayCount(8);
    setIsExpanded(false);
  }, [selectedTag]);

  const skeletons = () => {
    return new Array(8).fill("").map((_, index) => {
      return (
        <Skeleton
          key={index}
          variant="rectangular"
          height={160}
          className={`${styles.card} ${AnimationName.SLIDE_IN_BOTTOM}`}
        ></Skeleton>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={`${styles.title} ${AnimationName.SLIDE_IN_BOTTOM}`}>
        {t("developer:businessTitle")}
      </h1>
      <div
        className={`${styles.nav} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_2}`}
      >
        <div className={`flex flex-1 items-center ${styles.navWrapper}`}>
          {navData.map((item) => (
            <div
              key={item.tag}
              className={`${styles.navItem} ${selectedTag === item.tag ? styles.selectedTag : ""}`}
              onClick={() => setSelectedTag(item.tag)}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className={`hidden w-[135px] pl-[15px] md:flex`}>
          <SeeMore
            className={`${styles.showMore} ${isMobile ? styles.showMoreMobile : ''}`}
            href="https://github.com/hello-xone/xone_assets/blob/main/tools/ToolList.json"
            target="_blank"
            text={t("common:showMore")}
          ></SeeMore>
        </div>
      </div>

      <div className="block mt-2 md:hidden">
        <SeeMore
          className={`${styles.showMore} ${isMobile ? styles.showMoreMobile : ''}`}
          href="https://github.com/hello-xone/xone_assets/blob/main/tools/ToolList.json"
          target="_blank"
          text={t("common:showMore")}
        ></SeeMore>
      </div>

      <div
        className={`${styles.content} ${styles.contentSpace} ${styles.large} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_4}`}
      >
        <div className={styles.cards}>
          {isLoading ? (
            skeletons()
          ) : (
            <>
              {displayList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.card} ${AnimationName.SLIDE_IN_BOTTOM}`}
                  >
                    <div>
                      <div className={styles.name}>{item.name}</div>
                      <p className={styles.description}>{item.description}</p>
                    </div>
                    <SeeMore
                      href={item.url}
                      className={`${styles.tagBtn}`}
                      text={item.tags}
                      target="_blank"
                    ></SeeMore>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {shouldShowToggleButton && (
        <div
          className={`${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_5}`}
        >
          <div
            className="cursor-pointer flex items-center justify-center gap-x-[5px] mt-8"
            onClick={handleToggle}
          >
            <span className="text-[var(--t1)] text-[16px] font-medium">
              {isExpanded ? t("common:viewLess") : t("common:viewMore")}
            </span>
            <ArrowBottomInline 
              className={`w-[24px] h-[24px] transition-transform duration-200 ${
                isExpanded ? 'rotate-180' : ''}`} 
            />
          </div>
        </div>
      )}
    </div>
  );
};
