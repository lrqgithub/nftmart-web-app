import { statusArr } from './Status';

export const NODE_URL = 'wss://dot.bcdata.top/';
export const PINATA_POST_SERVER = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
export const POLKADOT_EXTENSION = 'https://polkadot.js.org/extension/';
export const GRAPHQL_ENDPOINT = 'https://api.subquery.network/sq/subqns/nftmart-beta-4';
export const CACHE_SERVER_URL = 'http://yapi.bcdata.top/mock/13/api/';
// export const CACHE_SERVER_URL = 'http://test-cache.bcdata.top/api/';
export const IPFS_URL = 'https://ipfs-web.bcdata.top/ipfs/';
export const DBURL = 'http://localhost:8888/graphql';
export const IPFS_POST_SERVER = 'https://ipfs-api.bcdata.top';// ipfs node
export const IPFS_GET_SERVER = 'https://ipfs-web.bcdata.top/ipfs/';// query with cid server
export const PINATA_SERVER = 'https://ipfs-web.bcdata.top/ipfs/'; // query with cid server
export const UPLOAD_PINATA_SERVER = 'https://gateway.pinata.cloud/ipfs/';
export const UPLOAD_OWN_SERVER = 'https://ipfs-api.bcdata.top/api/v0/add?stream-channels=true&pin=true&progress=true&wrap-with-directory=false';

export const NAV_MAP: Record<string, string> = {
  navHome: '/',
  navBrowing: '/browsing',
  navListSale: `/browsing?status=${statusArr[2]}`,
  navAuction: `/browsing?status=${statusArr[1]}`,
  navActive: '/active',
};

// online

export const MAX_FILE_SIZE = 1024 * 1024 * 10;
