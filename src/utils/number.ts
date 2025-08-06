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
