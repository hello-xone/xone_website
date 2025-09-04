import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

import { EventData } from "@/api/events";

import { SeeMore } from "../comm/link/SeeMore";

export const Card = ({ data }: { data: EventData }) => {
    const { t } = useTranslation("events");
    return (
        <div
            onClick={() => {
                window.open(data.event.url);
            }}
            className="w-[calc(100vw-105px)] md:w-[448px] shrink-0 text-left rounded-[16px] cursor-pointer border-[1px] hover:border-t1 border-solid border-transparent p-[24px] bg-b2"
        >
            <img
                alt=""
                className="w-full rounded-[8px] aspect-[400/240] mb-[22px] bg-b3"
                src={data.event.cover_url}
            ></img>
            <div className="text-t3 leading-[21px] mb-2 text-base">
                {dayjs(data.event.start_at).format("YYYY-MM-DD hh:mm z")}
            </div>
            <div className="text-t1 font-bold leading-[32px] mb-2 text-[24px] line-clamp-2">
                {data.event.name}
            </div>
            <div className="text-t1 leading-[22px] mb-2 text-base line-clamp-3">
                {data.event.description}
            </div>
            <SeeMore
                className="md:text-base font-medium mt-6"
                href="View Details"
                text={t("viewDetails")}
            ></SeeMore>
        </div>
    );
};
