export enum CONFIG_URL {
  NODE_URL = 'wss://dot.bcdata.top/',
  PINATA_POST_SERVER = 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  POLKADOT_EXTENSION= 'https://polkadot.js.org/extension/'
}

export const TYPES = {
  Properties: 'u8',
  NFTMetadata: 'Vec<u8>',
  BlockNumber: 'u32',
  BlockNumberOf: 'BlockNumber',

  OrderData: {
    currencyId: 'Compact<CurrencyIdOf>',
    price: 'Compact<Balance>',
    deposit: 'Compact<Balance>',
    deadline: 'Compact<BlockNumberOf>',
    categoryId: 'Compact<CategoryIdOf>',
  },

  CategoryId: 'u32',
  CategoryIdOf: 'CategoryId',
  CategoryData: {
    metadata: 'NFTMetadata',
    nftCount: 'Compact<Balance>',
  },

  CurrencyId: 'u32',
  CurrencyIdOf: 'CurrencyId',
  Amount: 'i128',
  AmountOf: 'Amount',

  ClassId: 'u32',
  ClassIdOf: 'ClassId',
  ClassInfoOf: {
    metadata: 'NFTMetadata',
    totalIssuance: 'TokenId',
    owner: 'AccountId',
    data: 'ClassData',
  },
  ClassData: {
    deposit: 'Compact<Balance>',
    properties: 'Properties',
    name: 'Vec<u8>',
    description: 'Vec<u8>',
    createBlock: 'Compact<BlockNumberOf>',
  },

  TokenId: 'u64',
  TokenIdOf: 'TokenId',
  TokenInfoOf: { metadata: 'NFTMetadata', owner: 'AccountId', data: 'TokenData' },
  TokenData: {
    deposit: 'Compact<Balance>',
    createBlock: 'Compact<BlockNumberOf>',
  },
};

export const SS58_FORMAT = 50;

export const TOKEN_TRANSFERABLE_BURNABLE = 0b00000011;

export const NATIVE_CURRENCY_ID = 0;
