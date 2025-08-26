import GovernanceIcon from "@/assets/imgs/home/Governance-left.png"
import { SeeMore } from "@/components/comm/link/SeeMore"

export const Governance = () => {
    return <div className="flex pt-[40px] max-md:flex-col-reverse md:pt-[80px] gap-[40px] pb-[40px] md:pb-[160px] items-center w-full justify-between">
        <img alt="" src={GovernanceIcon} className="shrink-0 w-full md:w-[48.6%] h-auto"></img>
        <div className="flex-1">
            <div className="text-[24px] md:text-[48px] leading-[140%] md:leading-[120%] mb-4 md:mb-6 font-bold">Reliable, Community-driven Governance</div>
            <div className="text-t2 leading-[140%] text-base md:text-[20px] mb-6 md:mb-8">Xone introduces on-chain behavioral value incentives to achieve fair and dynamic rewards, recognize and motivate community contributions, and drive the sustainable development and collaboration of the ecosystem.</div>
            <SeeMore className="max-md:hidden" text="Get Started" href=""></SeeMore>
        </div>
    </div>
}