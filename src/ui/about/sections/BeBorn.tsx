import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

interface TimelineCard {
  id: string;
}

interface LayoutColumn {
  id: string;
  cards: TimelineCard[];
  cardCount?: number; // 该列有多少张卡片，用于自动计算高度
}

export default function BeBorn() {
  const { t } = useTranslation();

  // 布局配置
  const layoutConfig: LayoutColumn[] = [
    {
      id: "column-1",
      cardCount: 2,
      cards: [
        {
          id: "card-1",
        },
        {
          id: "card-2",
        },
      ],
    },
    {
      id: "column-2",
      cardCount: 1,
      cards: [
        {
          id: "card-2",
        },
      ],
    },
    {
      id: "column-3",
      cardCount: 2,
      cards: [
        {
          id: "card-4",
        },
        {
          id: "card-5",
        },
      ],
    },
    {
      id: "column-4",
      cardCount: 2,
      cards: [
        {
          id: "card-6",
        },
        {
          id: "card-7",
        },
      ],
    },
    {
      id: "column-5",
      cardCount: 1,
      cards: [
        {
          id: "card-8",
        },
      ],
    },
    {
      id: "column-6",
      cardCount: 2,
      cards: [
        {
          id: "card-9",
        },
        {
          id: "card-10",
        },
      ],
    },
  ];

  // 渲染单个卡片
  const renderCard = (card: TimelineCard) => {
    return (
      <div
        key={card.id}
        className="relative bg-[var(--b2)] rounded-[10px] h-full"
      ></div>
    );
  };

  // 渲染整列卡片
  const renderColumn = (column: LayoutColumn) => {
    const { cards, cardCount = cards.length } = column;

    return (
      <div
        key={column.id}
        className="flex flex-col gap-[20px] h-[420px]"
        style={{
          width: cardCount === 1 ? "620px" : "300px",
          marginRight: "20px",
        }}
      >
        {cards.map((card) => renderCard(card))}
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <div className="mt-[35px] md:mt-[40px]">
          <p className="text-[16px] font-normal text-[var(--t2)]">
            {t("about:beBornSubTitle")}
          </p>
          <h2 className="mt-[14px] md:text-[48px] text-[24px] font-bold text-[var(--t1)]">
            {t("about:beBornTitle")}
          </h2>
          <p className="mt-[16px] md:mt-[30px] text-[16px] font-normal text-[var(--t1)]">
            {t("about:beBornDesc")}
          </p>
        </div>
      </div>

      <div className="md:mt-[35px] mt-[20px] w-full overflow-hidden">
        <Marquee pauseOnHover speed={30} gradient={false}>
          <div className="flex" style={{ gap: 0 }}>
            {layoutConfig.map((column) => renderColumn(column))}
          </div>
        </Marquee>
      </div>
    </>
  );
}
