import { SeeMore } from "@/components/comm/link/SeeMore";

export const XoneChain = () => {
    return (
        <div className="flex w-full max-md:flex-col justify-between mt-10 md:mt-[162px]">
            <div className="shrink-0 text-t1 max-md:flex max-md:items-center max-md:justify-between">
                <div className="text-[24px] md:text-[48px] leading-[140%] font-bold">
                    Xone Mainnet
                </div>
                <div className="text-[14px] md:text-[20px] leading-[140%] md:mt-6">
                    Update : 10s
                </div>
            </div>
            <div className="shrink-0 max-md:mt-3 w-full md:w-[57%]">
                <div className="grid grid-cols-2 gap-[16px] md:gap-[24px]">
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            29.7 M
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            Address Add
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            29.7 M
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            Artwork is Cast
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            29.7 M
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            Token Minting
                        </div>
                    </div>
                    <div className="md:px-6 md:py-3">
                        <div className="text-[20px] md:text-[64px] mb-[6px] md:mb-2 leading-[100%] md:leading-[140%] font-bold">
                            29.7 M
                        </div>
                        <div className="text-[12px] md:text-[20px] text-t2 leading-[140%] md:leading-[100%]">
                            Avg. Tx Cost
                        </div>
                    </div>
                </div>
                <SeeMore className="mt-3 md:mt-6 md:pl-6" href="aa" text="See more"></SeeMore>
            </div>
        </div>
    );
};
