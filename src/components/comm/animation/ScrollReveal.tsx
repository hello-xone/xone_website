import { motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface props {
    children: React.ReactNode;
    animation?: 'fade' | 'slide' | 'scale';
    delay?: number;
    duration?: number;
}
export const MotionScrollReveal = ({
    children,
    // 动画类型：fade(淡入)、slide(滑入)、scale(缩放)
    animation = 'fade',
    // 动画延迟时间(秒)
    delay = 0.5,
    // 动画持续时间(秒)
    duration = 1
}: props) => {
    // 控制动画的变量
    const controls = useAnimation();
    // 目标元素的ref
    const ref = useRef(null);
    // 标记是否已执行过动画
    const [hasAnimated, setHasAnimated] = useState(false);

    // 定义不同动画的初始和目标状态
    const variants = {
        fade: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        slide: {
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 }
        },
        scale: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        }
    };

    useEffect(() => {
        // 创建交叉观察器
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;

                // 元素进入视口且未执行过动画
                if (entry.isIntersecting && !hasAnimated) {
                    controls.start('visible');
                    setHasAnimated(true);
                }
            },
            {
                // 元素可见比例达到10%时触发
                threshold: 0.2,
                // 提前50px开始检测
                rootMargin: '50px 0px'
            }
        );

        // 观察目标元素
        if (ref.current) {
            observer.observe(ref.current);
        }

        // 清理函数
        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [controls, hasAnimated]);

    return (
        <motion.div
            ref={ref}
            variants={variants[animation]}
            initial="hidden"
            animate={controls}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.1, 0.25, 1.0] // 缓动函数，使动画更自然
            }}
        >
            {children}
        </motion.div>
    );
};
