export const checkEmail = (email: string) => {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i.test(email);
};

export function checkMobile(): boolean {
  // 判断设备类型
  const isMobileDevice =
    /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry/i.test(
      navigator.userAgent
    );

  // 判断视口宽度
  const isSmallScreen = window.innerWidth < 767;

  // 同时满足两个条件
  return isMobileDevice || isSmallScreen;
}
