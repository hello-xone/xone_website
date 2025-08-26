import BannerIcon from "@/assets/imgs/home/banner-right.png"
import CommonButton from "@/components/comm/button/CommonButton"

export const Banner = () => {
    return <div className="flex items-center max-md:flex-col-reverse w-full max-md:gap-[20px] justify-between">
        <div className="w-full md:w-[57.25%] shrink-0 text-t1">
            <div className="text-[32px] md:text-[64px] leading-[140%] font-bold">Let’s Embrace The Future Together</div>
            <div className="text-base md:text-[20px] text-t2 md:text-t1 leading-[140%] mt-4 md:mt-6">Xone Chain is a modular Layer 1 blockchain that goes beyond scalability and efficiency. It focuses on ensuring every on-chain action creates tangible, traceable value.</div>
            <div className="grid max-md:grid-cols-1 md:flex items-center md:gap-[32px] mt-6 md:mt-10">
                <CommonButton className="text-base md:text-[18px] rounded-[12px] max-md:h-12 max-md:rounded-[12px] max-md:w-full">Deposit / withdrawal</CommonButton>
                <CommonButton className="!bg-b5 text-base md:text-[18px] text-t5 max-md:h-12 max-md:rounded-[12px] max-md:w-full max-md:mt-4 rounded-[12px]">Start building</CommonButton>
            </div>
        </div>
        <div className="w-full md:w-[41.5%] shrink-0">
            <img alt="" src={BannerIcon} className="w-full h-auto object-contain"></img>
        </div>
    </div>
}