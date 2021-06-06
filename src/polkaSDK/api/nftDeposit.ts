import { bnToBn } from '@polkadot/util';
import BN from 'bn.js';

import PolkaSDK from '..';

// query gas needed
export const nftDeposit = async (metadataStr: string, quantity: BN) => {
  try {
    const [_, depositAll] = await PolkaSDK.ws.call(
      'nftmart_mintTokenDeposit',
      [metadataStr.length, quantity.toNumber()],
      10000,
    ) as any;
    return bnToBn(depositAll);
  } catch (e) {
    return null;
  }
};
