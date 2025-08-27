/* eslint-disable @typescript-eslint/ban-ts-comment */

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { StorageKeys, StorageVersion } from "@/constants/storage";

import { StoreGet, StoreSet } from "./typing";

class NoticeStore {
  closed?: boolean;
  isLight?: boolean;
  constructor(
    private readonly set: StoreSet<NoticeStore>,
    // @ts-ignore
    private readonly get: StoreGet<NoticeStore>
  ) { }

  closeNotice = () => {
    this.set({
      closed: true,
    });
  };
}

export const useNoticeStore = create(
  // @ts-ignore
  persist<NoticeStore>((set, get) => new NoticeStore(set, get), {
    name: StorageKeys.NOTICE,
    storage: createJSONStorage(() => localStorage),
    version: StorageVersion.NOTICE,
  })
);
