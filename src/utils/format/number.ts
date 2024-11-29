import BigNumber from 'bignumber.js';
import numeral from 'numeral';

/**
 * 格式化bignumber
 * @param amount
 */
export const formatNumber = (amount?: BigNumber.Value, decimalPlaces = 6) => {
  if (!amount) {
    return '0';
  }

  // 向下取整到指定小数位数
  const roundedAmount = BigNumber(amount).dp(decimalPlaces, BigNumber.ROUND_DOWN);

  // 使用 numeral 进行格式化
  const formattedAmount = numeral(roundedAmount.toString()).format(
    `0,0.[${'0'.repeat(decimalPlaces)}]`
  );

  if (formattedAmount === 'NaN') {
    return formatBigNumber(amount, decimalPlaces);
  }

  return formattedAmount;

  // return numeral(amount.toString()).format(`0,0.[${'0'.repeat(decimalPlaces)}] floor`);
};

const formatBigNumber = (amount?: BigNumber.Value, decimalPlaces = 4) => {
  if (!amount) {
    return '0';
  }
  return BigNumber(BigNumber(amount).toFixed(decimalPlaces)).toFormat();
};

export function formatNumberAsAbbreviated(input: any) {
  return numeral(input).format('0.0a').toUpperCase();
}
