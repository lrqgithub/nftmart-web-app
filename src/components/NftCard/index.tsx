import React, { FC } from 'react';
import {
  Box, HTMLChakraProps, Text,
} from '@chakra-ui/react';
import { URL } from '../../constants';

type NftCardProps = {
  nft: NFT
} & HTMLChakraProps<'div'>

const NftCard: FC<NftCardProps> = ({
  nft: {
    name,
    metadata,
    collection,
    status,
  },
}) => (
  <Box display="flex" flexDirection="column" width="260px" height="310px" marginRight="16px" textColor="white">
    <Box alt="metadata_img" as="img" src={URL.IPFS_URL + metadata.url} height="195px" />
    <Box display="flex" flexDirection="column" bg="black" height="115px">
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Text>{collection.name}</Text>
        <Text>Price</Text>
      </Box>
      <Box display="flex" flexDirection="row" justifyContent="space-between">
        <Text>{name}</Text>
        <Text>{status.price}</Text>
      </Box>
    </Box>
  </Box>
);

export default NftCard;
