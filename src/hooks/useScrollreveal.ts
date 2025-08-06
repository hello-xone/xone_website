import { useMemo } from "react";
import ScrollReveal from "scrollreveal";
import { useStartupLoaded } from "./useStartupLoaded";

export enum AnimationName {
  SLIDE_IN_BOTTOM = "__slideInBottom",
  SLIDE_IN_LEFT = "__slideInLeft",
  SLIDE_IN_RIGHT = "__slideInRight",
  SCALE_UP = "scaleUp",
  SLIDE_IN_FADE = "slideInFade",
}

export enum DelayClassName {
  DELAY_1 = "delay-1",
  DELAY_2 = "delay-2",
  DELAY_3 = "delay-3",
  DELAY_4 = "delay-4",
  DELAY_5 = "delay-5",
  DELAY_6 = "delay-6",
  DELAY_7 = "delay-7",
  DELAY_8 = "delay-8",
  DELAY_9 = "delay-9",
  DELAY_10 = "delay-10",
  DELAY_11 = "delay-11",
  DELAY_12 = "delay-12",
  DELAY_13 = "delay-13",
  DELAY_14 = "delay-14",
  DELAY_15 = "delay-15",
  DELAY_16 = "delay-16",
  DELAY_17 = "delay-17",
  DELAY_18 = "delay-18",
  DELAY_19 = "delay-19",
  DELAY_20 = "delay-20",
  DELAY_21 = "delay-21",
  DELAY_22 = "delay-22",
  DELAY_23 = "delay-23",
  DELAY_24 = "delay-24",
}

interface Option {
  duration?: number;
  // reset?: boolean;
}

interface UseScrollrevealProps {
  // delays: Delay[];
  options?: {
    [name in AnimationName]: Option;
  };
}

const DefaultDuration = 600;
const Easing = "cubic-bezier(0.35, 0.13, 0.42, 1)";

export const useScrollreveal = (props?: UseScrollrevealProps) => {
  const { options } = props || {};

  const getDistance = () => {
    const width = document.getElementsByTagName("body")[0].clientWidth;
    if (width >= 1660) {
      return {
        bottom: 50,
        left: 40,
        right: 40,
      };
    }
    if (width >= 1440) {
      return {
        bottom: 40,
        left: 30,
        right: 30,
      };
    }
    if (width >= 480) {
      return {
        bottom: 25,
        left: 15,
        right: 15,
      };
    }
    return {
      bottom: 20,
      left: 10,
      right: 10,
    };
  };

  const initAnimation = () => {
    const { left, right } = getDistance();
    const bottomOption = options?.[AnimationName.SLIDE_IN_BOTTOM];
    ScrollReveal().reveal(`.${AnimationName.SLIDE_IN_BOTTOM}`, {
      reset: false,
      origin: 'bottom',
      distance: '40px',
      duration: 400,
      delay: 100,
      easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)',
      opacity: 0,
      viewOffset: {
        bottom: 120,
      },
    });

    ScrollReveal().reveal(`.${AnimationName.SLIDE_IN_FADE}`, {
      reset: false,
      easing: Easing,
      viewOffset: {
        bottom: 100,
      },
      duration: bottomOption?.duration || DefaultDuration,
      opacity: 0,
      delay: 100,
    });

    // ScrollReveal().reveal(`.${AnimationName.SCALE_UP}`, {
    //   reset: false,
    //   easing: "ease-in-out",
    //   duration: bottomOption?.duration || DefaultDuration,
    //   opacity: 0,
    //   scale: 0.85,
    //   delay: 150,
    //   viewOffset: {
    //     bottom: 100,
    //   },
    // });

    ScrollReveal().reveal(`.${AnimationName.SLIDE_IN_LEFT}`, {
      reset: false,
      origin: "left",
      easing: Easing,
      distance: `${left}px`,
      duration: DefaultDuration,
      opacity: 0,
      viewOffset: {
        bottom: 100,
      },
    });

    ScrollReveal().reveal(`.${AnimationName.SLIDE_IN_RIGHT}`, {
      reset: false,
      origin: "right",
      easing: Easing,
      distance: `${right}px`,
      duration: DefaultDuration,
      opacity: 0,
      viewOffset: {
        bottom: 100,
      },
    });

    // delay
    Object.values(DelayClassName).forEach((name, index) => {
      ScrollReveal().reveal(`.${name}`, {
        delay: (index + 1) * 100,
      });
    });
  };

  useStartupLoaded(initAnimation, []);

  const delayClassNames = useMemo(() => {
    return Object.values(DelayClassName);
  }, []);

  const update = () => {
    initAnimation();
  };

  return {
    delayClassNames,
    update,
  };
};
