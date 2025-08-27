import clsx from "clsx";
import { useMemo } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

import BitgetIcon from "@/assets/imgs/partners/bitget.png";
import BitgetLightIcon from "@/assets/imgs/partners/bitget-light.png";
import FenwickIcon from "@/assets/imgs/partners/fenwick.png";
import FenwickLightIcon from "@/assets/imgs/partners/fenwick-light.png";
import HuobiIcon from "@/assets/imgs/partners/Huobi.png";
import HuobiDarkIcon from "@/assets/imgs/partners/Huobi-dark.png";
import HuobiLightIcon from "@/assets/imgs/partners/Huobi-light.png";
import HyperLiquidIcon from "@/assets/imgs/partners/hyperliquid.png";
import HyperLiquidLightIcon from "@/assets/imgs/partners/hyperliquid-light.png";
import MateMaskIcon from "@/assets/imgs/partners/MateMask.png";
import MateMaskDarkIcon from "@/assets/imgs/partners/MateMask-dark.png";
import MateMaskLightIcon from "@/assets/imgs/partners/MateMask-light.png";
import MovementIcon from "@/assets/imgs/partners/movement.png";
import MovementDarkIcon from "@/assets/imgs/partners/movement-dark.png";
import MovementLightIcon from "@/assets/imgs/partners/movement-light.png";
import PancakeSwapIcon from "@/assets/imgs/partners/pancakeswap.png";
import PancakeSwapDarkIcon from "@/assets/imgs/partners/pancakeswap-dark.png";
import PancakeSwapLightIcon from "@/assets/imgs/partners/pancakeswap-light.png";
import SuiIcon from "@/assets/imgs/partners/sui.png";
import SuiLightIcon from "@/assets/imgs/partners/sui-light.png";
import SunSwapIcon from "@/assets/imgs/partners/SunSwap.png";
import SunSwapDarkIcon from "@/assets/imgs/partners/SunSwap-dark.png";
import SunSwapLightIcon from "@/assets/imgs/partners/SunSwap-light.png";
import SwapXIcon from "@/assets/imgs/partners/swapx.png";
import SwapXDarkIcon from "@/assets/imgs/partners/swapx-dark.png";
import SwapXLightIcon from "@/assets/imgs/partners/swapx-light.png";
import ThunesIcon from "@/assets/imgs/partners/thunes.png";
import ThunesDarkIcon from "@/assets/imgs/partners/thunes-dark.png";
import ThunesLightIcon from "@/assets/imgs/partners/thunes-light.png";
import TokenUpIcon from "@/assets/imgs/partners/tokenUp.png";
import TokenUpDarkIcon from "@/assets/imgs/partners/tokenUp-dark.png";
import TokenUpLightIcon from "@/assets/imgs/partners/tokenUp-light.png";
import UniswapIcon from "@/assets/imgs/partners/Uniswap.png";
import UniswapLightIcon from "@/assets/imgs/partners/Uniswap-light.png";
import XionIcon from "@/assets/imgs/partners/xion.png";
import XionDarkIcon from "@/assets/imgs/partners/xion-dark.png";
import XionLightIcon from "@/assets/imgs/partners/xion-light.png";
import {
    AnimationName,
    DelayClassName,
    useScrollreveal,
} from "@/hooks/useScrollreveal";
import useApplicationStore from "@/store/applicationStore";

const images = [
    [
        {
            link: "https://app.uniswap.org/",
            default: UniswapIcon,
            light: UniswapLightIcon,
            dark: UniswapLightIcon,
        },
        {
            link: "https://www.htx.com/",
            default: HuobiIcon,
            light: HuobiLightIcon,
            dark: HuobiDarkIcon,
        },
        {
            link: "https://tokenup.org/en",
            default: TokenUpIcon,
            light: TokenUpLightIcon,
            dark: TokenUpDarkIcon,
        },
        {
            link: "https://sui.io/",
            default: SuiIcon,
            light: SuiLightIcon,
            dark: SuiLightIcon,
        },
        {
            link: "https://swapx.exchange/en",
            default: SwapXIcon,
            light: SwapXLightIcon,
            dark: SwapXDarkIcon,
        },
        {
            link: "https://metamask.io/",
            default: MateMaskIcon,
            light: MateMaskLightIcon,
            dark: MateMaskDarkIcon,
        },
        {
            link: "https://movementlabs.xyz/",
            default: MovementIcon,
            light: MovementLightIcon,
            dark: MovementDarkIcon,
        },
    ],
    [
        {
            link: "https://bitget.com",
            default: BitgetIcon,
            light: BitgetLightIcon,
            dark: BitgetLightIcon,
        },
        {
            link: "https://app.hyperliquid.xyz/",
            default: HyperLiquidIcon,
            light: HyperLiquidLightIcon,
            dark: HyperLiquidLightIcon,
        },
        {
            link: "https://xion.burnt.com/",
            default: XionIcon,
            light: XionLightIcon,
            dark: XionDarkIcon,
        },
        {
            link: "https://sun.io/",
            default: SunSwapIcon,
            light: SunSwapLightIcon,
            dark: SunSwapDarkIcon,
        },
        {
            link: "https://pancakeswap.finance/home",
            default: PancakeSwapIcon,
            light: PancakeSwapLightIcon,
            dark: PancakeSwapDarkIcon,
        },
        {
            link: "https://www.thunes.com/",
            default: ThunesIcon,
            light: ThunesLightIcon,
            dark: ThunesDarkIcon,
        },
        {
            link: "https://www.fenwick.co.uk/",
            default: FenwickIcon,
            light: FenwickLightIcon,
            dark: FenwickLightIcon,
        },
    ],
];
export const Ecosystem = () => {
    const { isLight } = useApplicationStore();
    useScrollreveal();
    const imageLinks: Record<string, string> = {
        "aleta planet.svg": "https://aletaplanet.com/",
        "color-black.svg": "https://pancakeswap.finance/home",
        "Fenwick.svg": "/",
        "HL.svg": "https://hyperfoundation.org/",
        "Huobi.svg": "https://www.htx.com/",
        "MateMask.svg": "https://metamask.io/",
        "Movement.svg": "https://movementlabs.xyz/",
        "rainlink.svg": "https://rainlink.co/",
        "Sui.svg": "https://sui.io/",
        "SunSwap.svg": "https://sun.io/",
        "SwapX.svg": "https://swapx.exchange/en",
        "thunes.svg": "https://www.thunes.com/",
        "TokenUp.svg": "https://tokenup.org/en",
        "TRON.svg": "https://tron.network/",
        "Uniswap.svg": "https://app.uniswap.org/",
        "Xion.svg": "https://xion.burnt.com/",
    };

    // const images = useMemo(() => {
    //     return import.meta.glob("@/assets/imgs/partners/*", {
    //         eager: true,
    //     }) as Record<string, { default: string }>;
    // }, []);

    // const imagesArr = useMemo(() => {
    //     const keys = Object.keys(images);
    //     const partSize = Math.ceil(keys.length / 4);
    //     const parts = [];
    //     for (let i = 0; i < 4; i++) {
    //         const start = i * partSize;
    //         const end = start + partSize;
    //         const part = keys.slice(start, end);
    //         parts.push(part.map((key) => images[key]));
    //     }
    //     return parts;
    // }, [images]);

    return (
        <div className="py-[80px] gap-[140px] w-full">
            <div className="text-[48px] text-center leading-[140%] mb-6 font-bold">
                Explore a vibrant ecosystem
            </div>
            <div className="text-t2 text-center leading-[140%] text-[20px] mb-10">
                Discover an ecosystem with a mission — open, adaptable, and committed to
                advancing the future of blockchain.
            </div>
            <div
                className={`relative flex-grow cursor-grab overflow-hidden w-full ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_4}`}
                data-wow-delay="0.3s"
            >
                <div
                    className={clsx(
                        `absolute h-full top-0 w-[12%] z-[2] left-0 bg-[linear-gradient(270deg,transparent_0%,#070808_100%)]`,
                        {
                            "!bg-[linear-gradient(270deg,transparent_0%,#ffffff_100%)]":
                                isLight,
                        }
                    )}
                ></div>
                <div
                    className={clsx(
                        `absolute h-full top-0 w-[12%] z-[2] right-0 bg-gradient-to-l from-[#070808] to-transparent`,
                        {
                            "!from-[#ffffff]": isLight,
                        }
                    )}
                ></div>
                <div className="w-full">
                    {images &&
                        images.map((imgs, i) => {
                            return (
                                <Marquee
                                    key={i}
                                    speed={100000000000000}
                                    className={"mt-[64px]"}
                                    pauseOnHover
                                    direction={(i + 1) % 2 === 0 ? "left" : "right"}
                                >
                                    {imgs.map((img, index) => {
                                        return (
                                            <div className={"mx-[60px] group h-[34px]"} key={index}>
                                                <Link to={img.link || ""} target="_blank" className="relative">
                                                    <img
                                                        className="h-full block group-hover:hidden object-contain"
                                                        src={img.default}
                                                        alt=""
                                                    />
                                                    {isLight && (
                                                        <img
                                                            className="h-full hidden group-hover:block object-contain"
                                                            src={img.light}
                                                            alt=""
                                                        />
                                                    )}
                                                    {!isLight && (
                                                        <img
                                                            className="h-full hidden group-hover:block object-contain"
                                                            src={img.dark}
                                                            alt=""
                                                        />
                                                    )}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </Marquee>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};
