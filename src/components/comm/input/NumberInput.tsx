import { Input, InputProps } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import { ChangeEvent, FocusEvent, useEffect, useState } from 'react';

export type TNumberInputProps = {
  maxValue?: BigNumber.Value;
  minValue?: BigNumber.Value;
  isDecimal?: boolean;
  decimalPlaces?: number;
} & InputProps;

const NumberInput = (props: TNumberInputProps) => {
  const {
    onChange,
    value,
    minValue = -1,
    maxValue = -1,
    onBlur,
    isDecimal = true,
    decimalPlaces = 18,
    ...rest
  } = props;

  const [_value, _setValue] = useState('');

  const _onPropsChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  const onHandleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;
    event.target.value = checkMaxMin(handlerNumber(inputValue));
    _onPropsChange?.(event);
    _setValue(event.target.value);
  };

  const _onBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.target.value = checkMaxMin(event.target.value);
    onBlur?.(event);
    _setValue(event.target.value);
  };

  const handlerNumber = (inputValue: string) => {
    let regex = new RegExp('^\\d*\\.?\\d{0,' + decimalPlaces + '}$');
    if (!isDecimal) {
      regex = /^\d*$/;
    }
    if (regex.test(inputValue)) {
      if (inputValue === '.') {
        inputValue = '0.';
      }
      return inputValue;
    }
    return _value;
  };

  const checkMaxMin = (inputValue: string) => {
    if (!inputValue) return '';
    if (inputValue.endsWith('.')) {
      return inputValue;
    }
    let _val = inputValue;
    const bg_minValue = BigNumber(minValue);
    const bg_maxValue = BigNumber(maxValue);

    if (Number(_val) !== 0) {
      // 限制范围
      if (!bg_minValue.eq(-1) && bg_minValue.gt(_val)) {
        _val = bg_minValue.dp(decimalPlaces, BigNumber.ROUND_DOWN).toString();
      } else if (!bg_maxValue.eq(-1) && bg_maxValue.lt(_val)) {
        _val = bg_maxValue.dp(decimalPlaces, BigNumber.ROUND_DOWN).toString();
      }
    }
    return _val;
  };

  useEffect(() => {
    const _val = checkMaxMin(handlerNumber(String(value) || ''));
    _setValue(_val);
  }, [value, minValue, maxValue, isDecimal]);

  return <Input {...rest} value={_value} onChange={onHandleChange} onBlur={_onBlur} />;
};

export default NumberInput;
