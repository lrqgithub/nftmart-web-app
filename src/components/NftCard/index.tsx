import React, { FC } from 'react';
import {
  Box, HTMLChakraProps,
} from '@chakra-ui/react';
import { URL } from '../../constants';

type NftCardProps = {
  nft: NFT
} & HTMLChakraProps<'div'>

const NftCard: FC<NftCardProps> = ({
  nft: {
    metadata,
  },
}) => (
  <Box display="flex" flexDirection="column">
    <Box alt="metadata_img" as="img" src={URL.IPFS_URL + metadata.url} width="260px" height="195px" />
  </Box>
);

export default NftCard;
