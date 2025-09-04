import gsap from 'gsap';

// 定义过渡动画
export const fadeTransition = {
    // 离开当前页面的动画
    leave({ current }: { current: any }) {
        return gsap.to(current.container, { opacity: 0, duration: 0.5 });
    },
    // 进入新页面的动画
    enter({ next }: { next: any }) {
        return gsap.from(next.container, { opacity: 0, duration: 0.5 });
    },
};