import { web3FromAddress } from '@polkadot/extension-dapp';
import { noop } from 'react-query/types/core/utils';

import PolkaSDK from '..';
import { TOKEN_TRANSFERABLE_BURNABLE } from '../../constants';
import { txLog } from '../../utils/txLog';
import { ClassMetadata } from '../types/ClassMetadata';

const defaultClassMetadata: ClassMetadata = {
  name: '', // name of nft asset
  bannerUrl: '', // banner media url of class
  url: '', // class img url of class
  externalUrl: '', // website url
  description: '', // nft desc
};
export const createClass = async ({
  address = '',
  metadata = defaultClassMetadata,
  cb = { success: noop, error: (err: any) => err },
}) => {
  try {
    const injector = await web3FromAddress(address);
    const { name, description } = metadata;
    const metadataStr = JSON.stringify(metadata);
    const res = await PolkaSDK.api.tx.nftmart
      .createClass(metadataStr, name, description, TOKEN_TRANSFERABLE_BURNABLE)
      .signAndSend(address, { signer: injector.signer }, (result: any) => txLog(result, cb.success));
    // console.log(res, res);
    return res;
  } catch (error) {
    cb.error(error.toString());
    return null;
  }
};
