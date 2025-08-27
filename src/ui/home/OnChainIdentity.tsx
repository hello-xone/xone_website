import OnChainIdentityIcon from "@/assets/imgs/home/on-chain-identity-right.png"
import OnChainIdentityLightIcon from "@/assets/imgs/home/on-chain-identity-right-light.png"
import AssetAnalysisIcon from "@/assets/svg/home/asset-analysis.svg?react"
import AssetsIcon from "@/assets/svg/home/assets.svg?react"
import IdIcon from "@/assets/svg/home/id.svg?react"
import MultiChainIcon from "@/assets/svg/home/multi-chain.svg?react"
import SdkIcon from "@/assets/svg/home/sdk.svg?react"
import CommonButton from "@/components/comm/button/CommonButton"
import useApplicationStore from "@/store/applicationStore"

const tips = [{
    icon: <IdIcon className="text-t1"></IdIcon>,
    title: "个性靓号",
}, {
    icon: <MultiChainIcon className="text-t1"></MultiChainIcon>,
    title: "多链交互",
}, {
    icon: <AssetsIcon className="text-t1"></AssetsIcon>,
    title: "链上交易解析",
}, {
    icon: <AssetAnalysisIcon className="text-t1"></AssetAnalysisIcon>,
    title: "资产分析与管理",
}, {
    icon: <SdkIcon className="text-t1"></SdkIcon>,
    title: "SDK、API 接入支持",
}]
export const OnChainIdentity = () => {
    const { isLight } = useApplicationStore()
    return <div className="flex py-[40px] max-md:flex-col md:py-[80px] gap-[140px] items-center w-full justify-between">
        <div className="flex-1">
            <div className="text-[24px] md:text-[48px] leading-[140%] mb-4 md:mb-6 font-bold">链上身份从此唯一可信</div>
            <div className="text-t2 leading-[140%] text-base md:text-[20px] mb-6 md:mb-8">{`Xone DID 是基于 ENS 打造的综合身份与资产管理平台，让你的多链地址在一个统一身份下互联互通。成为您在 Web3 世界的身份枢纽与数据入口。`}</div>
            <img alt="" src={isLight ? OnChainIdentityLightIcon : OnChainIdentityIcon} className="shrink-0 mb-6 md:hidden w-full h-auto"></img>
            {
                tips && tips.map((item, index) => {
                    return <div key={index} className="flex items-center gap-[14px] mb-4 md:mb-5">
                        {item.icon}
                        <span className="leading-[140%] font-medium">{item.title}</span>
                    </div>
                })
            }
            <CommonButton className="mt-8">开始尝试</CommonButton>
        </div>
        <img alt="" src={isLight ? OnChainIdentityLightIcon : OnChainIdentityIcon} className="shrink-0 max-md:hidden w-[45%] h-auto"></img>

    </div>
}