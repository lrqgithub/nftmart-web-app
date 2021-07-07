import React, { FC, MouseEventHandler } from 'react';
import {
  Stack, Image, HTMLChakraProps, Flex, Text, Button,
} from '@chakra-ui/react';

import {
  Polkadot,
  IconXuanzhong,
} from '../../assets/images';

type CollectionSelectorProps = {
  collectionArr: Collection[],
  selectedArr: string[],
  handleSelect: MouseEventHandler<HTMLButtonElement>
} & HTMLChakraProps<'div'>

const CollectionSelector: FC<CollectionSelectorProps> = (({ selectedArr, collectionArr, handleSelect }) => (
  <Flex
    p="0 9px"
    boxSizing="border-box"
    w="100%"
    direction="column"
    h="234px"
    overflowY="scroll"
  >
    {collectionArr.map((collection) => (
      <Button
        key={collection.id}
        id={collection.id}
        onClick={handleSelect}
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        background="none"
        h="30px"
        padding="0px 0 0 0"
        m="8px 0 8px 0 !important"
        outline="none"
        _hover={{ background: 'none' }}
        _focus={{
          border: 'none',
          textDecoration: 'none',
        }}
      >
        {selectedArr.indexOf(collection.id) > -1
          ? <Image w="30px" h="30px" mr="8px" src={IconXuanzhong.default} alt="" />
          : <Image w="30px" h="30px" mr="8px" src={Polkadot.default} alt="" />}
        <Text
          fontSize="14px"
          fontFamily="TTHoves-Regular, TTHoves"
          fontWeight="400"
          color="#191A24"
        >
          {collection.name}
        </Text>
      </Button>

    ))}
  </Flex>
));

export default CollectionSelector;
