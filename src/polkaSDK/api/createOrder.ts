import { web3FromAddress } from '@polkadot/extension-dapp';
import { bnToBn } from '@polkadot/util';
import { noop } from 'react-query/types/core/utils';
import PolkaSDK from '..';
import { txLog } from '../../utils/txLog';
import { NATIVE_CURRENCY_ID } from '../../constants';
import { unit } from '../utils/unit';

const oneMonth = (60 * 60 * 24 * 30) / 6;

export const createOrder = async ({
  address = '', // address of current user
  categoryId = 0, // category id
  deposit = 200, // stake number of NMT
  price = 1, // list price
  classId = 0, // class id
  tokenId = 0, // token id
  during = oneMonth, // during block num ,need to be conver from timestamp
  cb = { success: noop, error: (err: any) => err },
}) => {
  try {
    const injector = await web3FromAddress(address);
    const currentBlockNumber = bnToBn(await PolkaSDK.api.query.system.number());

    // convert on chain precision
    const priceAmount = unit.mul(bnToBn(price));
    const depositAmount = unit.mul(bnToBn(deposit));
    const call = PolkaSDK.api.tx.nftmart.submitOrder(
      NATIVE_CURRENCY_ID,
      priceAmount,
      categoryId,
      classId,
      tokenId,
      depositAmount,
      currentBlockNumber.add(bnToBn(during)),
    );
    // const feeInfo = await call.paymentInfo(account);
    await call.signAndSend(address, { signer: injector.signer }, (result: any) => txLog(result, cb.success));
  } catch (error) {
    cb.error(error.toString());
  }
};
