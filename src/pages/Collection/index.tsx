import React, { useState, MouseEventHandler } from 'react';
import {
  Flex,
  Image,
  Avatar,
  Box,
  Text,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import MainContainer from '../../layout/MainContainer';
import {
  CollectionBackground,
  HuoDong,
  DISCORD,
  WEBSITE,
  Facebook,
  TWITTER,
} from '../../assets/images';
import SortBy from '../../components/SortBy';
import useNfts from '../../hooks/reactQuery/useNfts';
import useParams from '../../hooks/url/useParams';
import NftCard from '../../components/NftCard';

const ICONS = [
  { icon: HuoDong.default },
  { icon: DISCORD.default },
  { icon: TWITTER.default },
  { icon: Facebook.default },
  { icon: WEBSITE.default },
];
const ICON_LIST = ICONS.map((item, index) => ({
  src: item.icon,
  id: index,
  link: '',
}));

const Collection = ({ match }: RouteComponentProps<{ id: string }>) => {
  const { t } = useTranslation();

  const { id } = match.params;

  const { data, isLoading } = useNfts({ collection: [id] });

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }
  return (
    <MainContainer title={t('Collection.title')}>
      <Flex
        w="100vw"
        background="#000000"
        justifyContent="center"
        position="relative"
        mb="40px"
      />
      <Image maxWidth="1360px" width="100%" src={CollectionBackground.default} alt="banner" />
      <Flex direction="row" paddingTop="40px" paddingBottom="40px">
        <Avatar src="https://bit.ly/broken-link" w="100px" h="100px" />
        <Flex direction="column">
          <p>NickName</p>
          <p>Here is an introduction to the portfolio. If it is a cross-chain NFT asset, a contract is a portfolio.</p>
        </Flex>
        <Flex>
          {ICON_LIST.map((item, index) => (
            <Box
              key="index"
              width="40px"
              height="40px"
              borderRadius="4px 0px 0px 4px"
              border="1px solid #E5E5E5"
              display="flex"
              justifyContent="center"
              alignItems="center"
              _hover={{
                boxShadow: '0px 2px 8px 0px #E1E1E1',
              }}
            >
              <Image
                w="22px"
                h="22px"
                src={item.src}
              />
            </Box>
          ))}
        </Flex>

      </Flex>
      <Flex
        m="29px 0 20px 0"
        width="1088px"
        h="36px"
        flexFlow="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text
          fontSize="14px"
          fontFamily="TTHoves-Regular, TTHoves"
          fontWeight="400"
          color="#999999"
        >
          1,291 results
        </Text>
        <SortBy />
        {data?.orders.map((nft) => <NftCard nft={nft} />)}
      </Flex>
    </MainContainer>
  );
};

export default Collection;
