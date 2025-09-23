import { CircularProgress, Skeleton } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { CountUp } from "use-count-up";

import { fetchStatsByNet } from "@/api/common";
import { BaseContainer } from "@/components/layout/BaseContainer";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";
import { numberIndent } from "@/utils/number";

import styles from "./index.module.less";

interface Data {
  totalAddress?: string;
  totalArtwork?: string;
  totalToken?: string;
  averageTransactionCost?: string;
}

export const XoneChain = () => {
  const { t, i18n } = useTranslation();
  const [datas, setDatas] = useState<Data>();
  const [loading, setLoading] = useState(false);
  const [firstLoading, setFirstLoading] = useState(true);
  useScrollreveal();

  const getMainNetData = async () => {
    const data: Data = {
      totalAddress: undefined,
      totalArtwork: undefined,
      totalToken: undefined,
      averageTransactionCost: undefined,
    };
    setLoading(true);

    try {
      const stats = await fetchStatsByNet(false); // false for mainnet
      data.totalAddress = stats.total_addresses.toString();
      data.totalArtwork = stats.total_nfts.toString();
      data.totalToken = stats.total_tokens.toString();
      data.averageTransactionCost = stats.average_txn_fee24h.toString();
    } catch (err) {
      console.error(err);
    }

    setDatas(data);
    setLoading(false);
  };

  const { time } = useCountdownTimer({
    callback: async () => {
      await getMainNetData();
      firstLoading && setFirstLoading(false);
    },
    dependency: [firstLoading],
  });

  const plusSymbol = (str: string) => {
    return /[K|M|B]+/gi.test(str) ? "+" : "";
  };

  const list = useMemo(() => {
    return [
      {
        label: t("home:addressAdd"),
        render: () => {
          const { number, symbol } = numberIndent(datas?.totalAddress, {
            suffix: "",
            digits: 1,
          });
          if (loading) {
            return <Skeleton variant="text" className="w-[2em]"></Skeleton>;
          }

          return (
            <div>
              {datas?.totalAddress ? (
                <>
                  <CountUp
                    isCounting
                    decimalSeparator={"."}
                    thousandsSeparator={","}
                    end={Number(number || 0)}
                    duration={2}
                  />
                  {plusSymbol(`${number}${symbol}`)}
                </>
              ) : (
                "--"
              )}
            </div>
          );
        },
      },
      {
        label: t("home:artworkIsCast"),
        render: () => {
          const { number, symbol } = numberIndent(datas?.totalArtwork, {
            suffix: "",
            digits: 1,
          });
          if (firstLoading) {
            return <Skeleton variant="text" className="w-[2em]"></Skeleton>;
          }
          return (
            <div>
              {datas?.totalArtwork ? (
                <>
                  <CountUp
                    isCounting
                    decimalSeparator={"."}
                    thousandsSeparator={","}
                    end={Number(number || 0)}
                    duration={2}
                  />
                  {plusSymbol(number + (symbol || ""))}
                </>
              ) : (
                "--"
              )}
            </div>
          );
        },
      },
      {
        label: t("home:tokenMinting"),
        render: () => {
          const { number, symbol } = numberIndent(datas?.totalToken, {
            suffix: "",
            digits: 1,
          });
          if (firstLoading) {
            return <Skeleton variant="text" className="w-[2em]"></Skeleton>;
          }

          return (
            <div>
              {datas?.totalToken ? (
                <>
                  <CountUp
                    isCounting
                    decimalSeparator={"."}
                    thousandsSeparator={","}
                    end={Number(number || 0)}
                    duration={2}
                  />
                  {plusSymbol(`${number}${symbol}`)}
                </>
              ) : (
                "--"
              )}
            </div>
          );
        },
      },
      {
        label: t("home:averageTransactionCost"),
        render: () => {
          if (firstLoading) {
            return <Skeleton variant="text" className="w-[2em]"></Skeleton>;
          }
          return (
            <div>
              {datas?.averageTransactionCost ? (
                <>
                  ≈$
                  <CountUp
                    isCounting
                    decimalSeparator={"."}
                    thousandsSeparator={","}
                    end={
                      Number(
                        parseFloat(datas?.averageTransactionCost).toFixed(5)
                      ) || 0
                    }
                    duration={2}
                  />
                  {}
                </>
              ) : (
                "--"
              )}
            </div>
          );
        },
      },
    ];
  }, [datas, firstLoading, loading, t]);

  return (
    <BaseContainer className={styles.wrapper}>
      <div className={`flex items-center ${AnimationName.SLIDE_IN_BOTTOM}`}>
        <div className={`${styles.title}`}>{t("home:xoneMainNet")}</div>
        <div className={styles.update}>
          <span>
            {t("home:update")} :{" "}
            {!loading ? (
              <>
                {time}
                {"s"}
              </>
            ) : (
              <CircularProgress color="inherit" size={12}></CircularProgress>
            )}{" "}
            {t("home:ago")}
          </span>
        </div>
      </div>
      <div className={styles.datas}>
        {list.map((item, index) => {
          return (
            <div
              className={`${styles.data}  ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_2}`}
              key={index}
            >
              <div className={`${styles.value}`}>{item.render()}</div>
              <div className={`${styles.label}`}>{item.label}</div>
            </div>
          );
        })}
      </div>
    </BaseContainer>
  );
};
