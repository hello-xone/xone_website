import { Skeleton } from "@mui/material";
import { useNotifications } from "@toolpad/core/useNotifications";
import { ChainType, getWalletKit, useWalletKit } from "@web3jskit/walletkit";
import { utils } from "ethers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { numberToHex } from "viem";

import { fetchNetCountersByNet, fetchStatsByNet } from "@/api/common";
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
import { formatDecimal, preciseRound } from "@/utils/number";
import { fetchBlockNumber, getXoneEpochByNet } from "@/web3";

import styles from "./index.module.less";

const MainNetRpc = import.meta.env.VITE_APP_XO_MAIN_NET_RPC;
const TestNetRpc = import.meta.env.VITE_APP_XO_TEST_NET_RPC;

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
  const addNet = useCallback(async (connector: any, isConnectAfter?: boolean) => {
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
  }, [notifications, provider, selectedNetKey])

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

  const getBlockNumberByNet = async (
    isTestNet?: boolean
  ): Promise<number | undefined> => {
    try {
      const rpc = isTestNet ? TestNetRpc : MainNetRpc;
      return await fetchBlockNumber(rpc);
    } catch (err) {
      console.error(err);
    }
  };

  const getGasFee = async (isTestNet?: boolean) => {
    try {
      const stats = await fetchStatsByNet(isTestNet);
      const wei = stats.gas_prices.average.wei;
      if (Number(wei) === 0) return "0.00";
      return stats.gas_prices.average.wei
        ? formatDecimal(utils.formatUnits(parseInt(wei), 9).toString())
        : undefined;
    } catch (err) {
      console.error(err);
    }
  };
  const getMainNetData = useCallback(async () => {
    const data: NetData = {};
    const counters = await fetchNetCountersByNet();
    data.latestBlock = await getBlockNumberByNet();
    if (data.latestBlock) {
      data.gasFee = await getGasFee();
    }
    data.blockTime = counters.find(
      (item) => item.id === "averageBlockTime"
    )?.value;
    data.epoch = await getXoneEpochByNet();
    setMainNetData(data);
  }, [])

  const getTestNetData = useCallback(async () => {
    const data: NetData = {};
    const counters = await fetchNetCountersByNet(true);
    data.latestBlock = await getBlockNumberByNet(true);
    if (data.latestBlock) {
      data.gasFee = await getGasFee(true);
    }
    data.blockTime = counters.find(
      (item) => item.id === "averageBlockTime"
    )?.value;
    try {
      data.epoch = await getXoneEpochByNet(true);
    } catch (err) {
      console.error(err);
      data.epoch = undefined;
    }
    setTestNetData(data);
  }, [])

  const getData = useCallback(async () => {
    try {
      if (selectedNetKey === XoneChainId.MAIN_NET) {
        return getMainNetData()
      } else {
        return getTestNetData()
      }
      // const awaitMainNet = getMainNetData();
      // const awaitTestNet = getTestNetData();
      // await Promise.allSettled([awaitMainNet, awaitTestNet]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [getMainNetData, getTestNetData, selectedNetKey])

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
    return selectedNetKey === XoneChainId.MAIN_NET ? mainNetData : testNetData
  }, [mainNetData, testNetData, selectedNetKey])

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
          <div className="flex items-end">
            <MyCountUp
              value={
                currentNetData?.gasFee < "0.1"
                  ? 0.1
                  : Number(preciseRound(currentNetData?.gasFee, 1))
              }
              duration={1.5}
            />{" "}
          </div>
        ) : (
          "--"
        ),
      },
      {
        label: t("developer:netDataLabel3"),
        value: currentNetData?.blockTime ? (
          <MyCountUp
            value={Number(preciseRound(currentNetData?.blockTime, 1))}
            duration={1.5}
          />
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
  }, [t, currentNetData?.latestBlock, currentNetData?.gasFee, currentNetData?.blockTime, currentNetData?.epoch]);

  const links = useMemo(() => {
    return [
      {
        icon: <BlockExploreIcon></BlockExploreIcon>,
        title: t("developer:linkTitle1"),
        onClick: () => {
          const href =
            selectedNetKey === XoneChainId.MAIN_NET
              ? "https://xonescan.com/"
              : "https://testnet.xscscan.com/";
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
          window.open("https://docs.xone.org/developers/rpc", "_blank");
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
                className={`${styles.navItem} ${selectedNetKey === item.key ? styles.selectedNav : ""
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
