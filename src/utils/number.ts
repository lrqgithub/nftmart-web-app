import BigNumber from 'bignumber.js';

export const hexToUtf8 = (s: string) => {
  const str = s.slice(2);
  return decodeURIComponent(
    str
      .replace(/\s+/g, '') // remove spaces
      .replace(/[0-9a-f]{2}/g, '%$&'), // add '%' before each 2 characters
  );
};

type NumberValue = string | number;
export const toBigNumber = (n: NumberValue) => new BigNumber(String(n));
