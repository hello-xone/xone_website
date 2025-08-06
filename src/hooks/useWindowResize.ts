import { useEffect } from "react";

interface Callback {
  (event: Event): any;
}

class WindowResizeObserver {
  private observers: Callback[] = [];
  static __instance: WindowResizeObserver;
  constructor() {
    if (WindowResizeObserver.__instance) return WindowResizeObserver.__instance;
    WindowResizeObserver.__instance = this;
    this.listen();
    return WindowResizeObserver.__instance;
  }
  private listen = () => {
    window.addEventListener(
      "resize",
      (event: Event) => {
        this.observers.forEach((callback) => callback(event));
      },
      false
    );
  };
  readonly addObserver = (observer: Callback) => {
    const findObserver = this.observers.find((item) => item === observer);
    if (!findObserver) {
      return this.observers.push(observer);
    }
  };
  readonly removeObserver = (observer: Callback) => {
    this.observers = this.observers.filter((item) => item !== observer);
  };
}

export const useWindowResize = (callback: Callback, dependency: any[]) => {
  useEffect(() => {
    const windowResize = new WindowResizeObserver();
    windowResize.addObserver(callback);
    return () => {
      windowResize.removeObserver(callback);
    };
  }, [...dependency]);
};
