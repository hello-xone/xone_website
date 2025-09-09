import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

import styles from "./index.module.less";

// 生成指定范围内的随机数
const random = (min: number, max: number) =>
  Math.random() * (max - min) + min;

export const AnimatedTitle = ({
  text,
  className,
  waveHeight = 15, // 波浪高度，可自定义
  duration = 3,    // 动画周期，可自定义
  ...rest
}: {
  text: string;
  className?: string;
  waveHeight?: number;
  duration?: number;
}) => {

  return (
    <h1 {...rest} className={`text-[24px] md:text-[48px] text-center leading-[140%] mb-4 md:mb-6 font-bold ${styles.title} ${className || ""}`}>
      {text.split('').map((char, index) => (
        <AnimatedChar
          key={index}
          char={char}
          waveHeight={waveHeight}
          duration={duration}
        />
      ))}
    </h1>
  );
};

// 单个字符的动画控制器
const AnimatedChar = ({ char, waveHeight, duration }: {
  char: string;
  waveHeight: number;
  duration: number;
}) => {
  const controls = useAnimation();
  const phase = random(0, Math.PI * 2); // 每个字符唯一的相位

  useEffect(() => {
    // 使用控制函数定义动画，避免数组形式的样式
    const animateWave = async () => {
      await controls.start({
        y: Math.sin(phase) * waveHeight * 0.5,
        rotate: random(-1.5, 1.5),
        transition: { duration: duration * 0.25, ease: "easeInOut" }
      });

      // 第二阶段
      await controls.start({
        y: Math.sin(phase + Math.PI) * waveHeight,
        rotate: random(-1.5, 1.5),
        transition: { duration: duration * 0.25, ease: "easeInOut" }
      });

      // 第三阶段
      await controls.start({
        y: Math.sin(phase + Math.PI * 2) * waveHeight * 0.5,
        rotate: random(-1.5, 1.5),
        transition: { duration: duration * 0.25, ease: "easeInOut" }
      });

      // 第四阶段
      await controls.start({
        y: 0,
        rotate: random(-1.5, 1.5),
        transition: { duration: duration * 0.25, ease: "easeInOut" }
      });
    };

    animateWave();

    return () => {
      controls.stop();
    };
  }, [controls, phase, waveHeight, duration]);

  return (
    <motion.span
      initial={{ y: 0, rotate: 0 }}
      animate={controls}
      style={{
        display: "inline-block",
        margin: "0 0.5px"
      }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};