import BigNumber from 'bignumber.js';

export const IsNumberZero = (number?: string | number | BigNumber) => {
  return BigNumber(number || 0).eq(0);
};

export function checkMobile(): boolean {
  // 判断设备类型
  const isMobileDevice = /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry/i.test(
    navigator.userAgent
  );

  // 判断视口宽度
  const isSmallScreen = window.innerWidth < 767;

  // 同时满足两个条件
  return isMobileDevice || isSmallScreen;
}
