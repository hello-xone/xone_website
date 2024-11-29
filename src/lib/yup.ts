import { isAddress } from 'viem';
import * as yup from 'yup';

yup.addMethod(yup.string, 'address', function () {
  return this.test('address', 'Invalid Ethereum address', function (value) {
    const { path, createError } = this;
    // 如果值为空或者匹配正则表达式则通过验证，否则返回错误
    return value && isAddress(value) ? true : createError({ path, message: 'Invalid address' });
  });
});

export default yup;
