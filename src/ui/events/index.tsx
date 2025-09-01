import clsx from "clsx";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { EventData, getEvents, getEvents1 } from "@/api/events";
import DotIcon from "@/assets/svg/home/dot.svg?react";
import MapIcon from "@/assets/svg/home/map.svg?react";
import ParticipantsIcon from "@/assets/svg/home/participants.svg?react";
import CommonButton from "@/components/comm/button/CommonButton";
import { Title } from "@/components/comm/title";
import { Card } from "@/components/Events/Card";
import { isTimeRangeValid } from "@/utils/time";

export const Events = () => {
    const { t } = useTranslation("events");
    const [events, setEvents] = useState<EventData[]>([]);
    useEffect(() => {
        getEvents1().then((res) => {
            console.log(res)
        });
        getEvents().then((res) => {
            setEvents(res || []);
        });
    }, []);

    const progressEvents = useMemo(() => {
        if (events) {
            return events.filter((el) =>
                isTimeRangeValid(el.event.start_at, el.event.end_at)
            );
        }
        return [];
    }, [events]);
    return (
        <div className="container text-center !pb-[80px] md:!pb-[120px]">
            <Title className="mt-[42px] md:mt-[120px]">{t("title")}</Title>
            <div className="text-base md:text-xl leading-[140%] mb-6 md:mb-10">
                {t("desc")}
            </div>
            <CommonButton
                onClick={() => window.open("https://luma.com/xone")}
                className="max-md:w-full max-md:h-[48px] !bg-b5 text-base md:text-[18px] mx-auto !rounded-[12px]"
            >
                {t("joinUs")}
            </CommonButton>
            {
                progressEvents && progressEvents.length > 0 && <><Title className="mt-[80px] md:mt-[264px] !mb-4 md:!mb-5 !text-left">
                    {t("inProgress")}
                </Title>
                    <div className="text-base !text-left text-t2 leading-[140%] mb-8 md:mb-10">
                        {t("inProgressDesc")}
                    </div>
                    <div className="w-full overflow-x-auto gap-[24px]">
                        {progressEvents &&
                            progressEvents.map((el) => (
                                <Card key={`event-card-${el.api_id}`} data={el}></Card>
                            ))}
                    </div></>
            }
            <Title className="mt-[80px] md:mt-[264px] !text-left">
                {t("pastEvents")}
            </Title>
            {events &&
                events.map((el) => (
                    <div
                        key={`all-event-item-${el.api_id}`}
                        className="flex gap-[18px] max-md:flex-col mb-6 md:mb-10 max-md:justify-start max-md:items-start"
                    >
                        <div className="shrink-0 max-md:flex max-md:gap-[12px] max-md:items-center">
                            <div className="text-base md:text-[20px] font-semibold leading-[140%] text-t1">
                                {dayjs(el.event.start_at).format("YYYY-MM-DD")}
                            </div>
                            <div className="md:mt-[2px] text-base md:text-[14px] leading-[140%] text-t2">
                                {dayjs(el.event.start_at).format("ddd")}
                            </div>
                        </div>
                        <div className="shrink-0 hidden md:flex justify-center items-center flex-col w-[16px]">
                            <DotIcon></DotIcon>
                            <div className="mt-1 bg-[#F2F3F4] w-[1px] h-[calc(100%-12px)]"></div>
                        </div>
                        <div className="flex-1">
                            <div className="w-full flex items-center gap-[24px] bg-b2 px-[24px] py-[13.5px] rounded-[16px]">
                                <div className="flex-1">
                                    <img
                                        alt=""
                                        src={el.event.cover_url || ""}
                                        className="w-full aspect-[311/186] mb-[22px] md:hidden rounded-[6px]"
                                    ></img>
                                    <div className="text-t2 mb-3 md:mb-2 text-base md:text-[20px] leading-[21px] md:leading-[30px]"></div>
                                    <div className="font-bold text-[20px] md:text-[24px] leading-[26px] md:leading-[34px]  line-clamp-2 mb-3 md:mb-4 text-left">
                                        {el.event.name}
                                    </div>
                                    <div className="flex items-center text-base text-t3 mb-2 leading-[24px] gap-[8px]">
                                        <MapIcon className="text-t3"></MapIcon>
                                        <span>{el.event.geo_address_info?.address || ""}</span>
                                    </div>
                                    <div className="flex items-center text-base text-t3 mb-4 leading-[24px] gap-[8px]">
                                        <ParticipantsIcon className="text-t3"></ParticipantsIcon>
                                        <span>{el?.hosts && el?.hosts.length > 0 ? el?.hosts[0]?.name : ''}</span>
                                    </div>
                                    {el.tags && el.tags.length > 0 && (
                                        <div className="flex gap-[8px] items-center">
                                            {el.tags.map((el) => (
                                                <div
                                                    key={`tag-item-${el.name}`}
                                                    style={{
                                                        color: el.color || "#FF9142",
                                                    }}
                                                    className="px-[8px] py-[3.5px] md:py-[7.5px] bg-[#FFF5E8] rounded text-xs"
                                                >
                                                    {el.name}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center mt-4">
                                        {el.featured_guests && el.featured_guests.slice(0, 5).map((el, index) => (
                                            <div
                                                key={`avatar-item-${el.name}`}
                                                className={clsx(
                                                    `bg-[#FFC2B8] relative rounded-full border-[1px] w-[32px] h-[32px] border-[#0000000F] border-solid`,
                                                    {
                                                        "ml-[-11px]": index > 0,
                                                    }
                                                )}
                                            >
                                                <img alt={el.name} src={el.avatar_url} className="w-full rounded-full h-full"></img>
                                            </div>
                                        ))}
                                        {
                                            el.guest_count > 5 && <div className="w-[32px] h-[32px] bg-b3 z-[1] border-[1px] border-[#E9E9EB] rounded-full text-t3 ml-[-11px] text-[12px] font-medium flex items-center justify-center">
                                                +{el.guest_count - 5}
                                            </div>
                                        }

                                    </div>
                                </div>
                                <div className="shrink-0 hidden md:block w-[400px] aspect-[400/240] rounded-[12px]">
                                    <img
                                        alt=""
                                        src={el.event.cover_url || ""}
                                        className="w-full h-full rounded-[12px]"
                                    ></img>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    );
};
