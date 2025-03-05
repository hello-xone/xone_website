import { Box, Flex, Img, Text } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { memo, useEffect, useRef, useState } from 'react';
import { formatUnits } from 'viem';

import IMG_Arrow from '@/assets/imgs/release/arrow.png';
import XOCReleaseAbi from '@/config/abi/XOCRelease.json';
import { readContract } from '@/utils/contract';
import { formatReleaseNumber } from '@/utils/format/number';

type Props = {};

type EpochDetailsInfo = {
  totalEpoch: bigint;
  curlEpoch: bigint;
  details: EpochInfo[];
};

type EpochInfo = {
  epoch: bigint;
  blockNum: bigint;
  transactions: bigint;
  alRelease: string;
  curlRelease: string;
};

type EpochStatus = 'released' | 'releasing' | 'pending';

const getEpochStatus = (epoch: bigint, curlEpoch: bigint): EpochStatus => {
  if (epoch < curlEpoch) return 'released';
  if (epoch === curlEpoch) return 'releasing';
  return 'pending';
};

const EpochTimeLine = (props: Props) => {
  const [epochDetailsInfo, setEpochDetailsInfo] = useState<EpochDetailsInfo>(
    {} as EpochDetailsInfo
  );
  const timelineRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef(0);
  const lastPageXRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const restoreTimeoutRef = useRef<number>();

  const { details = [], curlEpoch } = epochDetailsInfo; // curlEpoch
  // const curlEpoch = BigInt(3); // TEST

  const getEpochDetailsInfo = async () => {
    const res = await readContract({
      address: import.meta.env.VITE_APP_XOC_RELEASE_ADDRESS,
      abi: XOCReleaseAbi,
      functionName: 'getEpochDetailsInfo',
      rpcUrl: import.meta.env.VITE_APP_MAIN_RPC_URL,
    });
    console.log('getEpochDetailsInfo:res', res);
    // res.details = res.details.slice(1, 30); // TEST
    // 删除第 2 - 49 个区块
    res.details.splice(1, 48);
    res.details.forEach((item: any) => {
      item.curlRelease = formatUnits(item.curlRelease, 18);
      item.alRelease = formatUnits(item.alRelease, 18);
    });
    setEpochDetailsInfo(res);
    // 设置当前区块为活动状态
    const currentIndex = res.details.findIndex(
      (item: any) => item.epoch === res.curlEpoch
    );
    // const currentIndex = 3; // TEST
    console.log('currentIndex---', currentIndex);
    setActiveIndex(currentIndex >= 0 ? currentIndex : null);
    setTimeout(() => {
      scrollToCenter(currentIndex >= 0 ? currentIndex : res.details.length - 1);
    }, 100);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.pageX - (timelineRef.current?.offsetLeft || 0);
    scrollLeftRef.current = timelineRef.current?.scrollLeft || 0;
    lastTimeRef.current = Date.now();
    lastPageXRef.current = e.pageX;
    velocityRef.current = 0;

    // 停止惯性滚动
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;

    // 添加最小速度阈值
    const minVelocity = 0.2;
    if (Math.abs(velocityRef.current) > minVelocity) {
      const startTime = Date.now();
      // 根据速度大小动态调整初始速度
      const startVelocity =
        velocityRef.current * (Math.abs(velocityRef.current) < 1 ? 0.8 : 0.5);

      const animate = () => {
        const elapsed = Date.now() - startTime;
        // 减小衰减时间到300ms,使用二次方衰减
        const progress = Math.min(1, elapsed / 300);
        const velocity = startVelocity * (1 - progress * progress);

        if (Math.abs(velocity) < 0.1) {
          cancelAnimationFrame(animationFrameRef.current!);
          return;
        }

        if (timelineRef.current) {
          const maxScroll =
            timelineRef.current.scrollWidth - timelineRef.current.clientWidth;
          const currentScroll = timelineRef.current.scrollLeft;
          const nextScroll = currentScroll + velocity;

          // 边界检测
          if (nextScroll <= 0 || nextScroll >= maxScroll) {
            cancelAnimationFrame(animationFrameRef.current!);
            return;
          }

          timelineRef.current.scrollLeft = nextScroll;
        }

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animationFrameRef.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;

    e.preventDefault();

    const currentTime = Date.now();
    const timeElapsed = currentTime - lastTimeRef.current;
    const currentPageX = e.pageX;

    // 优化速度计算
    if (timeElapsed > 0) {
      const rawVelocity = (currentPageX - lastPageXRef.current) / timeElapsed;
      // 限制速度范围在 -2 到 2 之间
      velocityRef.current = Math.max(-2, Math.min(2, rawVelocity)) * 16;
    }

    lastTimeRef.current = currentTime;
    lastPageXRef.current = currentPageX;

    const x = e.pageX - (timelineRef.current?.offsetLeft || 0);
    const walk = x - startXRef.current;

    if (timelineRef.current) {
      const maxScroll =
        timelineRef.current.scrollWidth - timelineRef.current.clientWidth;
      const newScrollLeft = Math.max(
        0,
        Math.min(maxScroll, scrollLeftRef.current - walk)
      );
      timelineRef.current.scrollLeft = newScrollLeft;
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();

    if (timelineRef.current) {
      const delta = e.deltaY || e.deltaX;
      const maxScroll =
        timelineRef.current.scrollWidth - timelineRef.current.clientWidth;

      // 使用 requestAnimationFrame 实现平滑滚动
      const startScroll = timelineRef.current.scrollLeft;
      const targetScroll = Math.max(
        0,
        Math.min(maxScroll, startScroll + delta)
      );
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(1, elapsed / 300); // 300ms 的滚动时间

        // easeInOutCubic 缓动函数
        const easing =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        timelineRef.current!.scrollLeft =
          startScroll + (targetScroll - startScroll) * easing;

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }
  };

  const scrollToCenter = (index: number) => {
    if (!timelineRef.current) return;

    // 停止当前的任何动画
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    const container = timelineRef.current;
    const points = container.querySelectorAll('.point');
    if (!points[index]) return;

    const point = points[index] as HTMLElement;
    const pointRect = point.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // 计算目标滚动位置
    const targetScroll =
      container.scrollLeft +
      (pointRect.left -
        containerRect.left -
        containerRect.width / 2 +
        pointRect.width / 2);

    // 开始平滑滚动动画
    const startScroll = container.scrollLeft;
    const distance = targetScroll - startScroll;
    const startTime = Date.now();
    const duration = 500; // 500ms的动画时间

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);

      // 使用easeOutQuart缓动函数
      const easing = 1 - Math.pow(1 - progress, 4);

      const currentScroll = startScroll + distance * easing;
      container.scrollLeft = currentScroll;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handlePointClick = (index: number, e: React.MouseEvent) => {
    // 阻止事件冒泡,避免触发拖动
    e.stopPropagation();
    scrollToCenter(index);
  };

  const handlePointMouseEnter = (index: number) => {
    // 清除可能存在的恢复timeout
    if (restoreTimeoutRef.current) {
      window.clearTimeout(restoreTimeoutRef.current);
      restoreTimeoutRef.current = undefined;
    }
    setActiveIndex(index);
  };

  // const handlePointMouseLeave = () => {
  //   // 添加200ms延时
  //   restoreTimeoutRef.current = window.setTimeout(() => {
  //     // 恢复到当前区块
  //     const currentIndex = details.findIndex(
  //       (item) => item.epoch === curlEpoch
  //     );
  //     setActiveIndex(currentIndex >= 0 ? currentIndex : null);
  //     restoreTimeoutRef.current = undefined;
  //   }, 2000);
  // };

  useEffect(() => {
    getEpochDetailsInfo();

    const timeline = timelineRef.current;
    if (timeline) {
      timeline.addEventListener('wheel', handleWheel, { passive: false });
    }

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseUp);

    return () => {
      if (timeline) {
        timeline.removeEventListener('wheel', handleWheel);
      }
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      // 清理timeout
      // if (restoreTimeoutRef.current) {
      //   window.clearTimeout(restoreTimeoutRef.current);
      // }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box flex='1' position='relative'>
      <Flex
        alignItems='center'
        position='relative'
        h='full'
        ref={timelineRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        css={css`
          overflow-x: auto;
          overflow-y: hidden;
          cursor: ${isDraggingRef.current ? 'grabbing' : 'grab'};
          scroll-behavior: auto; // 移除 smooth,使用自定义动画
          -webkit-overflow-scrolling: touch;

          &::-webkit-scrollbar {
            display: none;
          }

          -ms-overflow-style: none;
          scrollbar-width: none;
        `}
      >
        <Box
          bg='#E4D8F2'
          h='8px'
          position='absolute'
          bottom='18px'
          minW='100%'
          w={{ base: `${Math.max(100, details.length * 20)}%`, lg: `${Math.max(100, details.length * 10)}%` }}
        >
          <Flex
            position='absolute'
            top='50%'
            left='0'
            right='0'
            transform='translateY(-50%)'
            justifyContent='space-between'
            px={{ base: '40px', lg: '100px' }}
            css={css`
              > .point {
                width: 24px;
                height: 24px;
                border: 3px solid;
                background-color: #f8f5fc;
                border-radius: 999px;
                cursor: pointer;
                transition: all 0.2s;

                &.released {
                  border-color: #dedede;
                }
                &.releasing {
                  border-color: #ed0000;
                  animation: pulse 2s infinite;
                }
                &.pending {
                  border-color: #d1b6ec;
                }

                &:hover {
                  transform: scale(1.1);
                }

                // 添加活动状态样式
                &.active {
                  transform: scale(1.1);
                  z-index: 2;
                }

                @keyframes pulse {
                  0% {
                    box-shadow: 0 0 0 0 rgba(237, 0, 0, 0.4);
                  }
                  70% {
                    box-shadow: 0 0 0 10px rgba(237, 0, 0, 0);
                  }
                  100% {
                    box-shadow: 0 0 0 0 rgba(237, 0, 0, 0);
                  }
                }
              }
            `}
          >
            {details.map((item, i) => {
              const status = getEpochStatus(item.epoch, curlEpoch);
              const isActive = i === activeIndex;

              return (
                <Box
                  key={i}
                  position='relative'
                  className={`point ${status} ${isActive ? 'active' : ''}`}
                  onClick={(e) => handlePointClick(i, e)}
                  onMouseEnter={() => handlePointMouseEnter(i)}
                // onMouseLeave={handlePointMouseLeave}
                >
                  <EpochContent
                    epochInfo={item}
                    status={status}
                    isVisible={isActive}
                    index={i}
                    total={details.length}
                  />
                </Box>
              );
            })}
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

const EpochContent = memo(
  ({
    epochInfo,
    status,
    isVisible,
    index,
    total,
  }: {
    epochInfo: EpochInfo;
    status: EpochStatus;
    isVisible: boolean;
    index: number;
    total: number;
  }) => {

    const statusStyles = {
      released: {
        color: '#4c4c4c',
        bg: '#e0e0e0',
        border: '1px solid #e0e0e0',
      },
      releasing: {
        color: '#02FF56',
        bg: 'rgba(26, 26, 26, 0.50)',
        border: '1px solid #fff',
      },
      pending: {
        color: '#4c4c4c',
        bg: '#e0e0e0',
        border: '1px solid #e0e0e0',
      },
    };

    const statusText = {
      released: 'Ended',
      releasing: 'Releasing',
      pending: 'Pending Release',
    };

    const openBlockExplorer = () => {
      window.open(
        `${import.meta.env.VITE_APP_BLOCK_EXPLORER}/block/${epochInfo.blockNum}`
      );
    };

    // 计算位置调整
    const getPositionStyles = () => {
      if (index === 0) {
        // 第一个区块
        return {
          transform: 'translateX(100px)',
        };
      }
      if (index === total - 1) {
        // 最后一个区块
        return {
          transform: 'translateX(-40px)',
        };
      }
      return {};
    };

    const positionStyles = getPositionStyles();

    return (
      <Box
        position='absolute'
        className='epoch-content'
        opacity={isVisible ? 1 : 0}
        visibility={isVisible ? 'visible' : 'hidden'}
        pointerEvents={isVisible ? 'auto' : 'none'}
        left='50%'
        transform='translateX(-50%) translateY(-100%)'
        w={{ base: '280px', lg: '340px' }}
        textAlign='left'
        color='white'
        zIndex={1}
        fontSize='14px'
        transition='opacity 0.2s ease'
      >
        <Box
          bgColor='red.pri'
          borderRadius='xl'
          p='10px 20px'
          boxShadow='lg'
          transform={positionStyles.transform}
        >
          <Flex justify='space-between' mb={2} alignItems='center'>
            <Text
              cursor='pointer'
              _hover={{ textDecoration: 'underline' }}
              onClick={openBlockExplorer}
            >
              Block #{epochInfo.blockNum.toString()}
            </Text>
            <Flex color={statusStyles[status].color} border={statusStyles[status].border} fontWeight='bold' rounded='full' alignItems='center' gap='8px' px='10px' py='6px' h='26px' bg={statusStyles[status].bg} fontSize={{ base: '12px', lg: '14px' }}>
              <Box w='5px' h='5px' bg={statusStyles[status].color} rounded='full' />
              {statusText[status]}
            </Flex>
          </Flex>

          <Box>
            <Flex justify='space-between' mb={2}>
              <Text>Release Amount(XOC)</Text>
              <Text>{formatReleaseNumber(epochInfo.curlRelease)}</Text>
            </Flex>
            <Flex justify='space-between' mb={2}>
              <Text>Transaction Count</Text>
              <Text>{epochInfo.transactions.toString()}</Text>
            </Flex>
            <Flex justify='space-between'>
              <Text>Successfully Released(XOC)</Text>
              <Text>{formatReleaseNumber(epochInfo.alRelease)}</Text>
            </Flex>
          </Box>
        </Box>
        <Box
          textAlign='center'
          py='3'
          css={css`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-4px);
              }
            }

            img {
              animation: float 2s ease-in-out infinite;
            }
          `}
        >
          <Img src={IMG_Arrow} w='12px' mx='auto' />
        </Box>
      </Box>
    );
  }
);

EpochContent.displayName = 'EpochContent';

export default EpochTimeLine;