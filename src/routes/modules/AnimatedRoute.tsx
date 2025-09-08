import { motion } from 'framer-motion';
import { ComponentType } from 'react';

// 动画变体配置 - 可根据需要修改
const pageVariants = {
    // 淡入淡出效果
    fade: {
        initial: { opacity: 0 },
        in: { opacity: 1 },
        out: { opacity: 0 }
    },
    // 滑动效果
    slide: {
        initial: { x: 300, opacity: 0 },
        in: { x: 0, opacity: 1 },
        out: { x: -300, opacity: 0 }
    },
    // 缩放效果
    scale: {
        initial: { scale: 0.8, opacity: 0 },
        in: { scale: 1, opacity: 1 },
        out: { scale: 1.2, opacity: 0 }
    },
    // 旋转效果
    rotate: {
        initial: { rotate: -10, scale: 0.9, opacity: 0 },
        in: { rotate: 0, scale: 1, opacity: 1 },
        out: { rotate: 10, scale: 0.9, opacity: 0 }
    }
};

// 动画路由包装组件
interface AnimatedRouteProps {
    Component: ComponentType;
}

export const AnimatedRoute = ({ Component }: AnimatedRouteProps) => {
    return (
        <motion.div
            variants={pageVariants.slide}
            initial="initial"
            animate="in"
            exit="out"
            transition={{

                type: 'keyframes',
                ease: 'easeIn',
                duration: 0.3

            }}
        >
            <Component />
        </motion.div>
    );
};
