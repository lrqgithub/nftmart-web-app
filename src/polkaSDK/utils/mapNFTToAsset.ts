export const mapNFTToAsset = (NFT: any, cid: number, tid?: number) => {
  let metadata = {};
  if (!NFT.metadata) return null;
  if (NFT.metadata.indexOf('{') >= 0) {
    const originalString = NFT.metadata.trim().startsWith('{') ? NFT.metadata : `{ ${NFT.metadata}`;
    metadata = JSON.parse(originalString);
  }

  return {
    ...NFT,
    ...metadata,
    metadata,
    classId: cid,
    tokenId: tid,
  };
};
