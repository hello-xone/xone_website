import { useCallback, useEffect } from "react";

export const useStartupLoaded = (callback: () => void, dependency: any[]) => {
  const finish = useCallback(() => {
    callback && callback();
  }, [...dependency]);
  useEffect(() => {
    if ((window as any).__loaded) {
      finish();
    } else {
      window.addEventListener("__loaded", finish, false);
    }
    return () => {
      window.removeEventListener("__loaded", finish, false);
    };
  }, [...dependency]);
};
