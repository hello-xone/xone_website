import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

export function getTimeDifference(endTime: TDate) {
  const now = dayjs();
  const end = dayjs(endTime);
  const diff = dayjs.duration(end.diff(now));

  const days = diff.days();
  const hours = diff.hours();
  const minutes = diff.minutes();
  const seconds = diff.seconds();
  if (isEndTimeGreaterThanNow(end)) {
    if (days > 0 || hours > 0) {
      return `${days}D ${hours}H`;
    } else {
      return `${minutes}M ${seconds}S`;
    }
  }
  return "0M 0S";
}
export function isEndTimeGreaterThanNow(endTime: TDate) {
  const now = dayjs();
  const end = dayjs(endTime);
  return end.isAfter(now);
}

/**
 * 判断：开始时间 < 当前时间 < 结束时间
 * @param {string|Date|dayjs.Dayjs} startTime - 开始时间（支持字符串、Date对象、dayjs对象）
 * @param {string|Date|dayjs.Dayjs} endTime - 结束时间（支持同上）
 * @returns {boolean} 是否满足条件
 */
export function isTimeRangeValid(startTime: string, endTime: string) {
  // 1. 获取当前时间（dayjs对象）
  const now = dayjs();

  // 2. 将输入时间转为dayjs对象（兼容多种格式）
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  // 3. 验证时间有效性（避免传入无效时间导致误判）
  if (!start.isValid()) throw new Error('无效的开始时间');
  if (!end.isValid()) throw new Error('无效的结束时间');

  // 4. 核心判断：开始时间在当前之前，且结束时间在当前之后
  return start.isBefore(now) && end.isAfter(now);
}