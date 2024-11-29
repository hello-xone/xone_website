import { To } from 'react-router';
import { Link } from 'react-router-dom';

/**
 * 省略字符
 * @param str
 * @returns
 */
export const truncateString = (str: string, pointLength = 4) => {
  if (!str) return str;
  const points = '.'.repeat(pointLength);
  return str.replace(/(^.{4})(.*)(.{4}$)/, `$1${points}$3`);
};

export const sleep = (ms: number) => {
  return new Promise<void>((res) => {
    setTimeout(() => {
      res();
    }, ms);
  });
};
/**
 * 节流函数
 * @param func
 * @param wait
 * @returns
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  let lastArgs: Parameters<T> | null = null;

  const throttled = (...args: Parameters<T>) => {
    if (timeout === null) {
      func(...args);
      timeout = setTimeout(() => {
        if (lastArgs !== null) {
          func(...lastArgs);
          lastArgs = null;
        }
        timeout = null;
      }, wait);
    } else {
      lastArgs = args;
    }
  };

  return throttled;
}

// 获取本地文件的url
export const getLocalFileUrl = (file: File) => {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.onload = () => {
      res(reader.result as string);
    };
    reader.onerror = () => {
      rej();
    };
    reader.readAsDataURL(file);
  });
};

export const getToProps: any = (to?: To) => {
  if (!to) return {};
  if (typeof to === 'string') {
    if (!to.startsWith('/')) {
      return {
        as: 'a',
        href: to,
        target: '_blank'
      };
    }
  }
  return {
    as: Link,
    to
  };
};
