import { BaseContainer } from "@/components/layout/BaseContainer";
import fatherStyles from "../index.module.less";
import { useMemo, useState, useEffect } from "react";
import i18next from "i18next";
import ArrowIcon from "@/assets/svg/home/arrow.svg?react";
import InfoArrowIcon from "@/assets/svg/home/info_arrow.svg?react";
import styles from "./index.module.less";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { Link } from "@/components/comm/link";
import { useTranslation } from "react-i18next";
import { AnimationName, DelayClassName } from "@/hooks/useScrollreveal";
import { Skeleton } from "@mui/material";

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
  // const [error, setError] = useState<string | null>(null);

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
  }, [i18next.language]);

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
    <BaseContainer className={styles.wrapper}>
      <h1 className={`${fatherStyles.title} ${AnimationName.SLIDE_IN_BOTTOM}`}>
        {t("developer:businessTitle")}
      </h1>
      <div
        className={`${styles.nav} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_2}`}
      >
        <div className="flex flex-wrap gap-2">
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
      </div>

      <div
        className={`${styles.content} ${styles.contentSpace} ${styles.large} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_4}`}
      >
        <div className={styles.cards}>
          {isLoading ? (
            skeletons()
          ) : (
            <>
              {filterList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.card} ${AnimationName.SLIDE_IN_BOTTOM}`}
                  >
                    <div>
                      <div className={styles.name}>{item.name}</div>
                      <p className={styles.description}>{item.description}</p>
                    </div>
                    <button
                      className={styles.tagBtn}
                      onClick={() => window.open(item.url)}
                    >
                      {item.tags}
                      <div className={styles.infoArrowIcon}>
                        <InfoArrowIcon></InfoArrowIcon>
                      </div>
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      <div
        className={`${styles.contentSpace} ${styles.small} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_4}`}
      >
        <Swiper
          className={styles.swiper}
          direction="horizontal"
          freeMode={true}
          slidesPerView="auto"
          modules={[FreeMode]}
          mousewheel={{
            forceToAxis: true,
            invert: false,
          }}
        >
          {isLoading ? (
            <>
              {new Array(4).fill("").map((_, index) => {
                return (
                  <SwiperSlide
                    key={index}
                    className={`w-max ${index === 0 ? "" : "ml-4"}`}
                  >
                    <Skeleton
                      key={index}
                      variant="rectangular"
                      height={160}
                      className={`${styles.card} `}
                    ></Skeleton>
                  </SwiperSlide>
                );
              })}
            </>
          ) : (
            <>
              {filterList.map((item, index) => {
                return (
                  <SwiperSlide key={index} className={`${styles.card}`}>
                    <div>
                      <div className={styles.name}>{item.name}</div>
                      <p className={styles.description}>{item.description}</p>
                    </div>
                    <button
                      className={styles.tagBtn}
                      onClick={() => window.open(item.url)}
                    >
                      {item.tags}
                      <div className={styles.infoArrowIcon}>
                        <InfoArrowIcon></InfoArrowIcon>
                      </div>
                    </button>
                  </SwiperSlide>
                );
              })}
            </>
          )}
        </Swiper>
      </div>

      <div
        className={`${styles.small} ${styles.bottom} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_6}`}
      >
        <Link href="" className={`${styles.seeMore}`}>
          {t("common:viewDetails")}
          <div className={styles.arrowIcon}>
            <ArrowIcon></ArrowIcon>
          </div>
        </Link>
      </div>
    </BaseContainer>
  );
};
