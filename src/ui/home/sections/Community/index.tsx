import { useMemo } from "react";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

import footprints from "@/assets/imgs/home/footprints.png";
import group from "@/assets/imgs/home/group.png";
import more1 from "@/assets/imgs/home/more1.png";
import more2 from "@/assets/imgs/home/more2.png";
import more4 from "@/assets/imgs/home/more4.png";
import more6 from "@/assets/imgs/home/more6.png";
import more7 from "@/assets/imgs/home/more7.png";
import more8 from "@/assets/imgs/home/more8.png";
import { Title } from "@/components/comm/title";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";

import styles from "./index.module.less";

enum ColumnType {
  NARROW = "narrow",
  WIDE = "wide",
}

enum CardType {
  img = "img",
  info = "info",
}

interface Card1 {
  id: string;
  type: CardType;
  img: string;
  title: string;
  description: string;
}

interface Card2 {
  id: string;
  type: CardType;
  number: number;
  description: string;
  img: string;
}

interface LayoutItem {
  id: string;
  type: ColumnType;
  children: (Card1 | Card2)[];
  columnCount: number; // 新增：竖列数量配置
}

const MaskLayer = ({
  title,
  description,
  columnType,
}: {
  title: string;
  description: string;
  columnType: ColumnType;
}) => {
  const isNarrow = columnType === ColumnType.NARROW;

  return (
    <div
      className={`${styles.maskLayer} ${isNarrow ? styles.maskLayerNarrow : styles.maskLayerWide}`}
    >
      <h2
        className={`${styles.maskLayerTitle} ${isNarrow ? styles.maskLayerTitleNarrow : styles.maskLayerTitleWide}`}
      >
        {title}
      </h2>
      <div
        className={`__lineHeight115 ${styles.description} ${isNarrow ? styles.descriptionNarrow : styles.descriptionWide}`}
      >
        {description}
      </div>
    </div>
  );
};

export const Community = () => {
  const { t, i18n } = useTranslation();
  useScrollreveal();

  const NarrowCardCard1 = (data: Card1 | Card2) => {
    switch (data.type) {
      case CardType.img: {
        const { img, title, description } = data as Card1;
        return (
          <div
            className={styles.card1}
            style={{
              backgroundImage: `url(${img})`,
            }}
          >
            <MaskLayer
              title={title}
              description={description}
              columnType={ColumnType.NARROW}
            ></MaskLayer>
          </div>
        );
      }
      case CardType.info: {
        const { number, description } = data as Card2;
        return (
          <div className={`${styles.card1} ${styles.info}`}>
            <div className={styles.shadow}>
              <img src={data.img} alt="" />
            </div>
            <div className={styles.number}>{number}+</div>
            <div className={`${styles.infoDesc} __lineHeight150`}>
              {description}
            </div>
          </div>
        );
      }
      default:
        return null;
    }
  };

  const Wide2 = ({ img, title, description }: Card1) => {
    return (
      <div
        className={styles.card2}
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        <MaskLayer
          title={title}
          description={description}
          columnType={ColumnType.WIDE}
        ></MaskLayer>
      </div>
    );
  };

  // 可配置的布局数组，支持配置竖列数量
  const list = useMemo(() => {
    return [
      {
        id: "1",
        type: ColumnType.NARROW,
        columnCount: 2,
        children: [
          {
            id: "1-1",
            type: CardType.img,
            img: more1,
            title: t("home:more1"),
            description: t("home:more1description"),
          },
          {
            id: "1-2",
            type: CardType.info,
            number: 100,
            description: t("home:more1Card"),
            img: footprints,
          },
        ],
      },
      {
        id: "2",
        type: ColumnType.WIDE,
        columnCount: 1,
        children: [
          {
            id: "2-1",
            type: CardType.img,
            img: more2,
            title: t("home:more2"),
            description: t("home:more2description"),
          },
        ],
      },
      {
        id: "3",
        type: ColumnType.NARROW,
        children: [
          {
            id: "3-1",
            type: CardType.info,
            number: 1000,
            description: t("home:more3Card"),
            img: group,
          },
          {
            id: "3-2",
            type: CardType.img,
            img: more4,
            title: t("home:more4"),
            description: t("home:more4description"),
          },
        ],
      },
      {
        id: "4",
        type: ColumnType.WIDE,
        columnCount: 1,
        children: [
          {
            id: "4-2",
            type: CardType.img,
            img: more6,
            title: t("home:more6"),
            description: t("home:more6description"),
          },
        ],
      },
      {
        id: "5",
        type: ColumnType.WIDE,
        children: [
          {
            id: "4-1",
            type: CardType.img,
            img: more8,
            title: t("home:more8"),
            description: t("home:more8description"),
          },
          {
            id: "4-2",
            type: CardType.img,
            img: more7,
            title: t("home:more7"),
            description: t("home:more7description"),
          },
        ],
      },
    ];
  }, [i18n.language]);

  // 渲染卡片的函数，根据columnCount自动分配高度
  const renderCards = (item: LayoutItem) => {
    const { children, columnCount } = item;
    const cardHeight = columnCount === 1 ? "100%" : `${100 / columnCount}%`;

    return children.map((card: any, index) => {
      const Card = item.type === ColumnType.NARROW ? NarrowCardCard1 : Wide2;
      return (
        <div
          key={index}
          style={{ height: cardHeight }}
          className={styles.dynamicCard}
        >
          <Card {...card} />
        </div>
      );
    });
  };

  return (
    <div className={styles.wrapper}>
      <Title className={`${styles.title} ${AnimationName.SLIDE_IN_BOTTOM}`}>
        {t("home:evenMore")}
      </Title>
      <div
        className={`${styles.content} ${AnimationName.SLIDE_IN_FADE} ${DelayClassName.DELAY_2}`}
      >
        <Marquee className={styles.marquee} pauseOnHover>
          <div className={styles.marqueeWrapper}>
            {[
              ...list,
              ...list,
              ...list,
              ...list,
              ...list,
              ...list,
              ...list,
            ].map((item, i) => {
              return (
                <div className={styles.cardWrapper} key={i}>
                  {renderCards(item)}
                </div>
              );
            })}
          </div>
        </Marquee>
      </div>
    </div>
  );
};
