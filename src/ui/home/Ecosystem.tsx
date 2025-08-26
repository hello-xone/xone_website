import { useMemo } from "react";
import Marquee from "react-fast-marquee";
import { Link } from "react-router-dom";

import { AnimationName, DelayClassName, useScrollreveal } from "@/hooks/useScrollreveal";
import clsx from "clsx";

export const Ecosystem = () => {
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

    const images = useMemo(() => {
        return import.meta.glob("@/assets/imgs/partners/*", {
            eager: true,
        }) as Record<string, { default: string }>;
    }, []);

    const imagesArr = useMemo(() => {
        const keys = Object.keys(images);
        const partSize = Math.ceil(keys.length / 4);
        const parts = [];
        for (let i = 0; i < 4; i++) {
            const start = i * partSize;
            const end = start + partSize;
            const part = keys.slice(start, end);
            parts.push(part.map((key) => images[key]));
        }
        return parts;
    }, [images]);

    const isLight = useMemo(() => {
        return localStorage.getItem('theme') !== 'dark'
    }, [])

    return <div className="py-[80px] gap-[140px] w-full">
        <div className="text-[48px] text-center leading-[140%] mb-6 font-bold">Explore a vibrant ecosystem</div>
        <div className="text-t2 text-center leading-[140%] text-[20px] mb-10">Discover an ecosystem with a mission — open, adaptable, and committed to advancing the future of blockchain.</div>
        <div
            className={`relative flex-grow cursor-grab overflow-hidden w-full ${AnimationName.SLIDE_IN_BOTTOM} ${DelayClassName.DELAY_4}`}
            data-wow-delay="0.3s"
        >
            <div className={clsx(`absolute h-full top-0 w-[12%] z-[2] left-0 bg-[linear-gradient(270deg,transparent_0%,#070808_100%)]`, {
                '!bg-[linear-gradient(270deg,transparent_0%,#ffffff_100%)]': isLight,
            })}></div>
            <div className={clsx(`absolute h-full top-0 w-[12%] z-[2] right-0 bg-gradient-to-l from-[#070808] to-transparent`, {
                '!from-[#ffffff]': isLight,
            })}></div>
            <div className="w-full">
                {imagesArr.map((imgs, i) => {
                    return (
                        <Marquee
                            key={i}
                            className={'mt-[64px]'}
                            pauseOnHover
                            direction={(i + 1) % 2 === 0 ? "left" : "right"}
                        >
                            {imgs.map((img, index) => {
                                const imgName = img.default;
                                const lastIndex = imgName.lastIndexOf("/");
                                const indexImg = imgName.substring(
                                    lastIndex + 1,
                                    imgName.length
                                );
                                const link = imageLinks[indexImg];
                                return (
                                    <div className={'mx-[60px]'} key={index}>
                                        <Link href={link} target="_blank">
                                            <img className="h-full object-contain" src={img.default} alt="" />
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
}