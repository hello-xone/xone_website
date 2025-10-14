import { request } from "./request";

export type GuestData = {
    api_id: string;
    avatar_url: string;
    bio_short: string;
    instagram_handle: null;
    last_online_at: string;
    linkedin_handle: string;
    name: string;
    tiktok_handle: string;
    timezone: string;
    twitter_handle: string;
    username: string;
    website: string;
    youtube_handle: string;
};

export type TagData = {
    api_id: string;
    color: string;
    name: string;
};
export type EventData = {
    api_id: string;
    tags: TagData[];
    hosts: Array<{
        name: string;
    }>
    guest_count: number;
    featured_guests: GuestData[];
    event: {
        api_id: string;
        name: string;
        start_at: string;
        cover_url: string;
        end_at: string;
        description: string;
        url: string;
        geo_address_info: {
            address: string;
            city: string;
        };
    };
};
export async function getEvents(): Promise<EventData[]> {
    const res = await request.get(
        "/api/v2/official-assets?calendar_api_id=cal-SHqvOTSSn2B1gf3&pagination_limit=100&period=past"
    );

    if (res.code !== 0) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error("Failed to fetch data");
    }

    return res.data.entries;
}

