import { web3FromAddress } from '@polkadot/extension-dapp';
import { bnToBn } from '@polkadot/util';
import { noop } from 'react-query/types/core/utils';
import PolkaSDK from '..';
import { txLog } from '../../utils/txLog';
import { nftDeposit } from './nftDeposit';

export const mintNft = async ({
  address = '',
  classId = 0,
  metadata = {},
  quantity = 1,
  cb = { success: noop, error: (err: any) => err },
}) => {
  try {
    const injector = await web3FromAddress(address);
    const metadataStr = JSON.stringify(metadata);
    const balancesNeeded = await nftDeposit(metadataStr, bnToBn(quantity));
    if (balancesNeeded === null) return null;
    const classInfo: any = await PolkaSDK.api.query.ormlNft.classes(classId);
    if (!classInfo.isSome) {
      // console.log('classInfo not exist');
      return null;
    }
    const ownerOfClass = classInfo.unwrap().owner.toString();

    const txs = [
      // make sure `ownerOfClass0` has sufficient balances to mint nft.
      PolkaSDK.api.tx.balances.transfer(ownerOfClass, balancesNeeded),
      // mint nft.
      PolkaSDK.api.tx.proxy.proxy(
        ownerOfClass,
        null,
        PolkaSDK.api.tx.nftmart.mint(address, classId, metadataStr, quantity),
      ),
    ];
    const batchExtrinsic = PolkaSDK.api.tx.utility.batchAll(txs);
    const res = await batchExtrinsic.signAndSend(
      address,
      { signer: injector.signer },
      (result: any) => txLog(result, cb.success),
    );
    return res;
  } catch (error) {
    cb.error(error.toString());
    return null;
  }
};
