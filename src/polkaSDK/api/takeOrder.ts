import { web3FromAddress } from '@polkadot/extension-dapp';
import { bnToBn } from '@polkadot/util';
import { noop } from 'react-query/types/core/utils';
import PolkaSDK from '..';
import { txLog } from '../../utils/txLog';
import { unit } from '../utils/unit';

export const takeOrder = async ({
  address = '', // address of current user
  ownerAddress = '', // owner address
  classId = 0, // class id
  tokenId = 0, // token id
  price = 0, // order price
  cb = { success: noop, error: (err: any) => err },
}) => {
  try {
    const injector = await web3FromAddress(address);
    let order: any = await PolkaSDK.api.query.nftmart.orders([classId, tokenId], ownerAddress);
    if (order.isSome) {
      const priceAmount = unit.mul(bnToBn(price));
      order = order.unwrap();
      const call = PolkaSDK.api.tx.nftmart.takeOrder(classId, tokenId, priceAmount, ownerAddress);
      const res = await call.signAndSend(address, { signer: injector.signer }, (result: any) => txLog(result, cb.success));
      return res;
    }
    return null;
  } catch (error) {
    cb.error(error.toString());
    return null;
  }
};
