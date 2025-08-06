import { Title } from "@/components/comm/title";
import styles from "./index.module.less";
import Marquee from "react-fast-marquee";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";
import { useMemo } from "react";
import group from "@/assets/imgs/home/group.png";
import footprints from "@/assets/imgs/home/footprints.png";
import more1 from "@/assets/imgs/home/more1.png";
import more2 from "@/assets/imgs/home/more2.png";
import more4 from "@/assets/imgs/home/more4.png";
import more6 from "@/assets/imgs/home/more6.png";
import more7 from "@/assets/imgs/home/more7.png";
import more8 from "@/assets/imgs/home/more8.png";

import { useTranslation } from "react-i18next";

enum ColumnType {
  NARROW = "narrow",
  WIDE = "wide",
}

enum CardType {
  img = "img",
  info = "info",
  // Card3 = 'Card3'
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
  number: string;
  description: string;
  img: string;
}

const MaskLayer = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className={styles.maskLayer}>
      <h2 className={styles.maskLayerTitle}>{title}</h2>
      <div className={`__lineHeight115 ${styles.description}`}>
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
            <MaskLayer title={title} description={description}></MaskLayer>
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
        <MaskLayer title={title} description={description}></MaskLayer>
      </div>
    );
  };

  const list = useMemo(() => {
    return [
      {
        id: "1",
        type: ColumnType.NARROW,
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
        children: [
          {
            id: "2-1",
            type: CardType.img,
            img: more2,
            title: t("home:more2"),
            description: t("home:more2description"),
          },
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
              const Card =
                item.type === ColumnType.NARROW ? NarrowCardCard1 : Wide2;
              return (
                <div className={styles.cardWrapper} key={i}>
                  {item.children.map((card: any, index) => {
                    return <Card key={index} {...card}></Card>;
                  })}
                </div>
              );
            })}
          </div>
        </Marquee>
      </div>
    </div>
  );
};
