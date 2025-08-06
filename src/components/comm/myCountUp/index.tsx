import { useEffect, useRef, useState } from "react";
import { CountUp } from "use-count-up";
interface MyCountUpProps {
  value: number;
  duration: number;
}

export const MyCountUp = ({ value, duration }: MyCountUpProps) => {
  const startRef = useRef(0);
  const [isAnimating, setIsAnimating] = useState(false);
  useEffect(() => {
    if (startRef.current !== value) {
      setIsAnimating(true);
      startRef.current = value;
    }
  }, [value, duration]);
  return (
    <CountUp
      key={value}
      isCounting={isAnimating}
      decimalSeparator={"."}
      thousandsSeparator={","}
      start={startRef.current}
      end={Number(value || 0)}
    ></CountUp>
  );
};
