import { Skeleton } from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";
import { ChainType, getWalletKit, useWalletKit } from "@web3jskit/walletkit";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { numberToHex } from "viem";

import { fetchStatsByNet } from "@/api/common";
import BlockExploreIcon from "@/assets/svg/developer/block_explore.svg?react";
import FolderIcon from "@/assets/svg/developer/folder.svg?react";
import WalletIcon from "@/assets/svg/developer/wallet.svg?react";
import ArrowIcon from "@/assets/svg/home/info_arrow.svg?react";
import { MyCountUp } from "@/components/comm/myCountUp";
import { XoneChainId, XoneMainNet, XoneTestNet } from "@/constants/net";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import {
  AnimationName,
  DelayClassName,
  useScrollreveal,
} from "@/hooks/useScrollreveal";
import { preciseRound } from "@/utils/number";

import styles from "./index.module.less";

interface NetData {
  latestBlock?: number;
  gasFee?: string;
  blockTime?: string;
  epoch?: string;
}

export const Net = () => {
  const { t } = useTranslation();
  const [selectedNetKey, setSelectedNetKey] = useState(XoneChainId.MAIN_NET);
  const [mainNetData, setMainNetData] = useState<NetData>();
  const [testNetData, setTestNetData] = useState<NetData>();
  const [loading, setLoading] = useState(true);
  const { delayClassNames } = useScrollreveal();
  const notifications = useNotifications();
  const { connect, provider, currentConnector } = useWalletKit();
  const addNet = useCallback(
    async (connector: any, isConnectAfter?: boolean) => {
      try {
        if (!connector) return;
        const chainIdOfHex = numberToHex(selectedNetKey);
        const net =
          selectedNetKey === XoneChainId.MAIN_NET ? XoneMainNet : XoneTestNet;
        try {
          await connector.provider.request({
            chainType: ChainType.EVM,
            method: "wallet_switchEthereumChain",
            params: [{ chainId: chainIdOfHex }],
          });
        } catch (err: any) {
          if (err?.code === 4902) {
            await provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  ...net,
                  chainId: chainIdOfHex,
                },
              ],
            });
          } else {
            return;
          }
        }
        notifications.show("Have been added", {
          severity: "success",
          autoHideDuration: 2000,
        });
      } catch (err) {
        console.error(err);
      }
    },
    [notifications, provider, selectedNetKey]
  );

  useEffect(() => {
    const handleDisconnect = () => {
      currentConnector?.disconnect && currentConnector?.disconnect();
    };

    if (currentConnector) {
      currentConnector.on("disconnect", handleDisconnect);
    }
    return () => {
      if (currentConnector) {
        currentConnector.off("disconnect", handleDisconnect);
      }
    };
  }, [currentConnector]);
  const navs = useMemo(() => {
    return [
      {
        name: "developer:mainnet",
        key: XoneChainId.MAIN_NET,
      },
      {
        name: "developer:testnet",
        key: XoneChainId.TEST_NET,
      },
    ];
  }, []);

  const getData = useCallback(async () => {
    try {
      const result = (await fetchStatsByNet()) as any;
      if (selectedNetKey === XoneChainId.MAIN_NET) {
        const { mainnet } = result;
        const data: NetData = {
          latestBlock: mainnet.block_number,
          gasFee: mainnet.gas_fee,
          blockTime: (mainnet.block_time / 1000).toFixed(3),
          epoch: mainnet.current_epoch,
        };
        setMainNetData(data);
      } else {
        const { testnet } = result;
        const data: NetData = {
          latestBlock: testnet.block_number,
          gasFee: testnet.gas_fee,
          blockTime: (testnet.block_time / 1000).toFixed(3),
          epoch: testnet.current_epoch,
        };
        setTestNetData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedNetKey]);

  useCountdownTimer({
    callback: async () => {
      await getData();
    },
    countdown: 5,
  });

  useEffect(() => {
    getData();
  }, [getData]);

  const currentNetData = useMemo(() => {
    return selectedNetKey === XoneChainId.MAIN_NET ? mainNetData : testNetData;
  }, [mainNetData, testNetData, selectedNetKey]);

  const datas = useMemo(() => {
    return [
      {
        label: t("developer:netDataLabel1"),
        value: currentNetData?.latestBlock ? (
          <MyCountUp
            value={Number(currentNetData?.latestBlock || 0)}
            duration={1.5}
          />
        ) : (
          "--"
        ),
      },
      {
        label: t("developer:netDataLabel2"),
        value: currentNetData?.gasFee ? (
          <div className="flex items-center">
            {currentNetData?.gasFee < "0.1" ? (
              <span className="mr-2 mt-1 font-normal text-[24px] text-t2">
                {"<"}
              </span>
            ) : (
              ""
            )}
            <MyCountUp
              value={
                currentNetData?.gasFee < "0.1"
                  ? 0.1
                  : Number(preciseRound(currentNetData?.gasFee, 1))
              }
              duration={1.5}
            />{" "}
            <div className="ml-2 mt-4 translate-y-[-3px] text-t2 text-[20px] font-[700]">
              Gwei
            </div>
          </div>
        ) : (
          "--"
        ),
      },
      {
        label: t("developer:netDataLabel3"),
        value: currentNetData?.blockTime ? (
          <div>
            <MyCountUp
              value={Number(preciseRound(currentNetData?.blockTime, 1))}
              duration={1.5}
            />
            <span className="ml-2 font-[700] text-t2 text-[26px]">s</span>
          </div>
        ) : (
          "--"
        ),
      },
      {
        label: t("developer:netDataLabel4"),
        value: currentNetData?.epoch ? (
          <MyCountUp
            value={Number(currentNetData?.epoch || 0)}
            duration={1.5}
          />
        ) : (
          "--"
        ),
      },
    ];
  }, [
    t,
    currentNetData?.latestBlock,
    currentNetData?.gasFee,
    currentNetData?.blockTime,
    currentNetData?.epoch,
  ]);

  const links = useMemo(() => {
    return [
      {
        icon: <BlockExploreIcon></BlockExploreIcon>,
        title: t("developer:linkTitle1"),
        onClick: () => {
          const href =
            selectedNetKey === XoneChainId.MAIN_NET
              ? "https://xonescan.com/"
              : "https://testnet.xonescan.com/";
          window.open(href, "_blank");
        },
      },
      {
        icon: <WalletIcon></WalletIcon>,
        title:
          selectedNetKey === XoneChainId.MAIN_NET
            ? t("developer:linkTitle2")
            : t("developer:linkTitle4"),
        onClick: async () => {
          if (!currentConnector) {
            await connect();
            const connector = getWalletKit().currentConnector;
            addNet(connector, true);
          } else {
            try {
              const accounts = await currentConnector.provider.request({
                method: "eth_accounts",
              });
              if (accounts?.length === 0) {
                currentConnector.disconnect();
                await connect();
                addNet(currentConnector, true);
              } else {
                addNet(currentConnector);
              }
            } catch (err) {
              console.error("accounts_err", err);
            }
          }
        },
        testNetHref: "",
        mainNetHref: "",
      },
      {
        icon: <FolderIcon></FolderIcon>,
        title: t("developer:linkTitle3"),
        onClick: () => {
          window.open("https://docs.xone.org/openapi/overview", "_blank");
        },
      },
    ];
  }, [t, selectedNetKey, currentConnector, connect, addNet]);

  return (
    <div className={styles.wrapper}>
      <div className="flex justify-center">
        <div className={`${styles.nav} ${AnimationName.SLIDE_IN_BOTTOM}`}>
          {navs.map((item) => {
            return (
              <div
                key={item.key}
                className={`${styles.navItem} ${
                  selectedNetKey === item.key ? styles.selectedNav : ""
                }`}
                onClick={() => setSelectedNetKey(item.key)}
              >
                {t(item.name)}
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.datas}>
        {datas.map((item, index) => {
          return (
            <div key={index} className={`${styles.data} `}>
              <h1
                className={`${styles.value} flex justify-center ${AnimationName.SLIDE_IN_BOTTOM} ${delayClassNames[index * 2]}`}
              >
                {loading ? (
                  <Skeleton variant="text" className="w-[2em]"></Skeleton>
                ) : (
                  item.value
                )}
              </h1>
              <div
                className={`${styles.lable} ${AnimationName.SLIDE_IN_BOTTOM} ${delayClassNames[index + index + 2]}`}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.links} ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_4}`}
      >
        {links.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => item.onClick()}
              className={`cursor-pointer ${styles.link} ${AnimationName.SLIDE_IN_BOTTOM} ${delayClassNames[index * 3]}`}
            >
              <div className={styles.linkLeft}>
                <div className={styles.linkIcon}>{item.icon}</div>
                <div className={styles.linkTitle}>{item.title}</div>
              </div>
              <div className={styles.arrowIcon}>
                <ArrowIcon></ArrowIcon>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
