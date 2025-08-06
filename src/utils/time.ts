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
