import BigNumber from "bignumber.js";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

import { formatNumber } from "@/utils/number";

export default function AnimatedNumber({ value, decimalPlaces = 0 }: { value: number; decimalPlaces?: number }) {
    const count = useMotionValue(0);
    // 记录上一次的目标值
    const lastValue = useRef(0);
    // 动画控制器引用
    const animationControl = useRef<any>(null);

    const animateToValue = useCallback(
        (target: any) => {
            // 停止当前可能正在进行的动画
            if (animationControl.current) {
                animationControl.current.stop();
            }

            // 从上一个值动画到新目标值
            animationControl.current = animate(count, target, {
                duration: 1,
                ease: "easeInOut",
            });

            // 更新上一次的值
            lastValue.current = target;
        },
        [count]
    );

    // 当props中的value变化时执行动画
    useEffect(() => {
        // 只有当value确实变化时才执行动画
        if (value !== lastValue.current) {
            animateToValue(value);
        }

        // 清理函数：组件卸载时停止动画
        return () => {
            if (animationControl.current) {
                animationControl.current.stop();
            }
        };
    }, [animateToValue, value]);

    const formattedNumber = useTransform(count, (value) => {
        const roundedValue = new BigNumber(value).toFixed(decimalPlaces, 1);
        return formatNumber(roundedValue);
    });
    return <motion.div>{formattedNumber}</motion.div>;
}
