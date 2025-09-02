import BigNumber from "bignumber.js";

interface NumberProps {
  digits?: number;
  prefix?: string;
  suffix?: string;
  roundUp?: 0 | 1;
}

export const numberIndent = (
  number: number | string = 0,
  option?: NumberProps
): { number: string; symbol: string } => {
  let { digits = 2, roundUp = 1 } = option || {};
  if (new BigNumber(number).lt(1)) {
    const _match = `${number}`.match(/\.(0+)/);
    if (_match) {
      const length = _match[0].length;
      if (length > 3) {
        digits = length + 3;
        return {
          number: new BigNumber(number)
            .toFixed(digits, roundUp)
            .replace(_match[0], `.{${length - 1}}`),
          symbol: "",
        };
      }
    }
    return {
      number: new BigNumber(number).toFixed(digits, roundUp),
      symbol: "",
    };
  }

  if (new BigNumber(number).gte(1) && new BigNumber(number).lt(1e4)) {
    const data = new BigNumber(number).toFixed(digits, roundUp).substring(0, 7);
    return {
      number: data.replace(new RegExp(/(\.*$)/g, "g"), ""),
      symbol: "",
    };
  }
  const lookup = [
    { shift: 3, symbol: "k", value: 1e6, type: "lt" },
    { shift: 6, symbol: "M", value: 1e9, type: "lt" },
    { shift: 9, symbol: "B", value: 1e9, type: "gte" },
  ];

  let _number: any = new BigNumber(number);
  let symbol = "";
  for (let index = 0; index < lookup.length; index++) {
    const element = lookup[index];
    if (_number[element.type](element.value)) {
      _number = _number.shiftedBy(-element.shift);
      symbol = element.symbol;
      break;
    }
  }

  return {
    number: _number.toFixed(digits, roundUp),
    symbol,
  };
};

export const formatNumberWithCommas = (num: number | string) => {
  if (isNaN(Number(num))) return "0";
  const numStr = num.toString();
  const [integerPart, decimalPart] = numStr.split(".");

  const formattedInteger = integerPart.replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1,"
  );

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export function formatDecimal(num: number | string, maxDecimals = 5) {
  const str = num.toString();
  const [integerPart, decimalPart] = str.split(".");

  if (!decimalPart) return integerPart;

  const trimmedDecimal = decimalPart
    .substring(0, maxDecimals)
    .replace(/0+$/, "");

  return trimmedDecimal ? `${integerPart}.${trimmedDecimal}` : integerPart;
}

export function preciseRound(value: string | number, decimals = 2) {
  if (isNaN(Number(value)) || isNaN(decimals)) return "0";

  const factor = Math.pow(10, decimals);
  const rounded =
    Math.round((Number(value) + Number.EPSILON) * factor) / factor;

  const [intPart, decPart = ""] = rounded.toString().split(".");

  const paddedDec = decPart.padEnd(decimals, "0").slice(0, decimals);

  return decimals > 0 ? `${intPart}.${paddedDec}` : intPart;
}

/**
 * 使用bignumber.js将数字格式化为k/m/b单位
 * @param {number|string|BigNumber} num - 待格式化的数字
 * @param {number} [decimalPlaces=2] - 保留的小数位数
 * @returns {string} 格式化后的字符串（如 1.23k, 4.56m, 7.89b）
 */
export function formatNumber(num: string | number, decimalPlaces = 2) {
  const number = new BigNumber(num);

  if (number.isNaN() || number.isZero()) {
    return '0';
  }

  const units = [
    { threshold: new BigNumber(1e9), symbol: 'B' }, // 十亿
    { threshold: new BigNumber(1e6), symbol: 'M' }, // 百万
    { threshold: new BigNumber(1e3), symbol: 'K' }, // 千
  ];

  for (const { threshold, symbol } of units) {
    if (number.abs().isGreaterThanOrEqualTo(threshold)) {
      const formatted = number.dividedBy(threshold).toFixed(decimalPlaces);
      const trimmed = new BigNumber(formatted).toString();
      return `${trimmed}${symbol}`;
    }
  }

  return number.toFixed(decimalPlaces);
}

export function countTrailingZeros(decimal: number | string) {
  if (decimal) {
    const match = decimal.toString().split(".")[1]?.match(/^0+/); // 匹配小数部分开头连续的 0
    return match ? match[0].length : 0;
  }
  return 0;
}

export function extractSignificantDigits(
  value: number | string,
  extractNum = 2
) {
  const decimalPart = value.toString().replace(/^0+\.0+/, ""); // 去掉前导 0 和无效小数点部分
  return decimalPart.substring(0, extractNum);
}

export function effectiveDecimals(value: number | string, precision = 4) {
  if (value) {
    const num = parseFloat(value.toString());

    if (isNaN(num)) {
      return "--";
    }

    // 将数字转换为字符串并保留最多 4 位有效小数
    const formatted = new BigNumber(num).toPrecision(
      precision,
      BigNumber.ROUND_DOWN
    );
    // 去掉多余的尾随零和小数点
    return parseFloat(formatted).toString();
  }
  return "--";
}
