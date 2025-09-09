import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';


// 渐入效果的变体
const revealVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.1 }
};

// 浮动效果的变体
const floatVariants = {
    hidden: { y: 0 },
    visible: {
        y: [-10, 10, -10],
        transition: { repeat: Infinity, duration: 3 }
    },
    hover: {
        y: [-20, 20, -20],
        transition: { repeat: Infinity, duration: 2 }
    }
};

const AnimatedTitles = ({ text, activeEffect = "reveal", className }: { className: string; text: string; activeEffect?: "reveal" | "float" | "typewriter" | "parallax" }) => {
    const [typedText, setTypedText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [scrollY, setScrollY] = useState(0);
    const [parallaxValues, setParallaxValues] = useState<any>([]);
    const titleRef = useRef(null);
    const controls = useAnimation();
    const [hasAnimated, setHasAnimated] = useState(false);

    // 处理滚动事件，计算视差效果
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setScrollY(scrollPosition);

            // 计算每个字符的视差位移
            if (activeEffect === "parallax") {
                const newParallaxValues = text.split("").map((_, index) => {
                    // 映射滚动范围[0, 500]到位移范围[0, (index%5)*30-60]
                    const scrollRange = 500;
                    const maxScroll = Math.min(scrollPosition, scrollRange);
                    const ratio = maxScroll / scrollRange;
                    return ratio * ((index % 5) * 30 - 60);
                });
                setParallaxValues(newParallaxValues);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeEffect, text]);

    // 处理打字效果
    useEffect(() => {
        if (activeEffect !== "typewriter") {
            setTypedText("");
            setIsTyping(false);
            return;
        }

        setIsTyping(true);
        setTypedText("");
        let index = 0;

        const typingInterval = setInterval(() => {
            if (index < text.length) {
                setTypedText(prev => prev + text.charAt(index));
                index++;
            } else {
                clearInterval(typingInterval);
                setIsTyping(false);
            }
        }, 100);

        return () => clearInterval(typingInterval);
    }, [activeEffect, text]);

    // 处理效果切换时的动画
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;

                // 元素进入视口且未执行过动画
                if (entry.isIntersecting && !hasAnimated) {
                    if (controls) {
                        controls.start("visible");
                    }
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
        if (titleRef.current) {
            observer.observe(titleRef.current);
        }
        return () => {
            if (titleRef && titleRef.current) {
                observer.unobserve(titleRef.current);
            }
        };
    }, [activeEffect, controls, hasAnimated]);

    // 分割文本为字符数组并应用动画
    const textToChars = (text: string) => {
        return text.split("").map((char, index) => (
            <motion.span
                key={index}
                className="inline-block relative transition-all duration-300"
                variants={
                    activeEffect === "reveal" ? revealVariants :
                        activeEffect === "float" ? floatVariants :
                            {}
                }
                initial="hidden"
                animate={activeEffect === "parallax" ? undefined : controls}
                whileHover="hover"
                transition={{
                    duration: 0.3,
                    delay: index * 0.04
                }}
                style={activeEffect === "parallax" ? {
                    transform: `translateY(${parallaxValues[index] || 0}px)`
                } : {}}
            >
                {char === ' ' ? '\u00A0' : char}
            </motion.span>
        ));
    };

    return (
        <AnimatePresence mode="wait">
            {activeEffect === "typewriter" ? (
                <div className="relative">
                    <motion.h1
                        className={`text-[24px] md:text-[48px] text-center leading-[140%] whitespace-nowrap mb-4 md:mb-6 font-bold ${className || ""}`}
                        ref={titleRef}
                        initial={{ width: 0 }}
                        animate={{ width: "auto" }}
                        transition={{ duration: 0.3 }}
                    >
                        {textToChars(typedText)}
                    </motion.h1>
                    {isTyping && (
                        <motion.span
                            className="absolute right-[-5px] top-0 bottom-0 w-3 bg-green-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.3 }}
                        />
                    )}
                </div>
            ) : (
                <motion.h1
                    key={activeEffect}
                    className={`text-[24px] md:text-[48px] text-center leading-[140%] whitespace-nowrap mb-4 md:mb-6 font-bold ${className || ""}`}
                    ref={titleRef}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ duration: 0.5 }}
                >
                    {textToChars(text)}
                </motion.h1>
            )}
        </AnimatePresence>
    );
};

export default AnimatedTitles;
