import { useEffect, useRef, useState } from "react";

interface CountdownTimerParams {
  callback: () => any;
  countdown?: number;
  dependency?: any[];
}

export const useCountdownTimer = ({
  callback,
  countdown = 10,
  dependency,
}: CountdownTimerParams) => {
  const timerRef = useRef(0);
  const [time, setTime] = useState(countdown);
  const run = async (second: number) => {
    if (second <= 0) {
      await callback();
      run(countdown);
      return;
    }
    setTime(second);
    timerRef.current = window.setTimeout(() => {
      run(--second);
    }, 1000);
    setTime;
  };

  const firstRequest = async () => {
    await callback();
    run(10);
  };

  useEffect(() => {
    firstRequest();
    return () => {
      window.clearTimeout(timerRef.current);
    };
  }, [...(dependency || [])]);
  return {
    time,
  };
};
