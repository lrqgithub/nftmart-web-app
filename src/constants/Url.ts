export enum URL {
  NODE_URL = 'wss://dot.bcdata.top/',
  PINATA_POST_SERVER = 'https://api.pinata.cloud/pinning/pinFileToIPFS',
  POLKADOT_EXTENSION = 'https://polkadot.js.org/extension/',
  GRAPHQL_ENDPOINT = 'https://api.subquery.network/sq/subqns/nftmart-beta-4'
}
export const NAV_MAP: Record<string, string> = {
  navHome: '/',
  navBrowing: '/explore',
  navListSale: '/explore?status=listing',
  navAuction: '/auction',
  navActive: '/active',
};

export const USER_LINKS: Record<string, string> = {
  quickAreaWallet: '/wallet',
  quickAreaCollections: '/collections',
  quickAreaNftCreate: '/create',
  // 'quickAreaProfileEdit': '/profile',
};

// online
export const DBURL = 'http://localhost:8888/graphql';
export const IPFS_POST_SERVER = 'https://ipfs-api.bcdata.top'; // ipfs node
export const IPFS_GET_SERVER = 'https://ipfs-web.bcdata.top/ipfs/'; // query with cid server
export const PINATA_SERVER = 'https://ipfs-web.bcdata.top/ipfs/'; // query with cid server
export const NODE_URL = process.env.REACT_APP_WS_URL;
export const PINATA_POST_SERVER = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
export const UPLOAD_PINATA_SERVER = 'https://gateway.pinata.cloud/ipfs/';
export const UPLOAD_OWN_SERVER = 'https://ipfs-api.bcdata.top/api/v0/add?stream-channels=true&pin=true&progress=true&wrap-with-directory=false';

export const MAX_FILE_SIZE = 1024 * 1024 * 10;
