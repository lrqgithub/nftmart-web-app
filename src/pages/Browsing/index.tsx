import React, { useState, MouseEventHandler } from 'react';
import {
  Spinner,
  Flex,
  Container,
  Box,
  Text,
  InputGroup,
  Input,
  Image,
  Center,
} from '@chakra-ui/react';
import { union, without } from 'lodash';

import { useTranslation } from 'react-i18next';
import MainContainer from '../../layout/MainContainer';
import CategorySelector from '../../components/CategorySelector';
import useCategories from '../../hooks/reactQuery/useCategories';
import StatusSelector from '../../components/StatusSelector';
import CollectionSelector from '../../components/CollectionSelector';
import useCollections from '../../hooks/reactQuery/useCollections';
import useNfts from '../../hooks/reactQuery/useNfts';
import NftCard from '../../components/NftCard';
import SortBy from '../../components/SortBy';

import {
  IconSearch,
  IconAllState,
  IconAllStateone,
} from '../../assets/images';

const statusArr = ['buyNow', 'onAuction', 'onAuction', 'hasOffers'];

const Browsing = () => {
  const { t } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedStatusArr, setSelectedStatusArr] = useState([statusArr[0]]);
  const [selectedCollectionArr, setSelectedCollectionArr] = useState<string[]>([]);

  const { data: categoriesData, isLoading: categoriesIsLoading } = useCategories();
  const { data: collectionsData, isLoading: collectionsIsLoading } = useCollections();
  const { data: nftsData, isLoading: nftsIsLoading } = useNfts(
    '', selectedCategoryId, selectedCollectionArr, selectedStatusArr,
  );

  const handleSelectCategory: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSelectedCategoryId(event.currentTarget.id);
  };

  const handleSelectStatus: MouseEventHandler<HTMLButtonElement> = (event) => {
    const status = event.currentTarget.id;
    setSelectedStatusArr(
      selectedStatusArr.indexOf(status) > -1
        ? without(selectedStatusArr, event.currentTarget.id)
        : union(selectedStatusArr, [event.currentTarget.id]),
    );
  };

  const handleSelectCollection: MouseEventHandler<HTMLButtonElement> = (event) => {
    const status = event.currentTarget.id;
    setSelectedCollectionArr(
      selectedCollectionArr.indexOf(status) > -1
        ? without(selectedCollectionArr, event.currentTarget.id)
        : union(selectedCollectionArr, [event.currentTarget.id]),
    );
  };

  if (categoriesIsLoading || collectionsIsLoading || nftsIsLoading) {
    return (
      <Center height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }
  return (
    <MainContainer title={t('Browsing.title')}>
      <Container mt="40px" display="flex">
        <Flex
          w="260px"
          h="492px"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          background="#F9F9F9"
          borderRadius="4px"
          p="20px"
          border="1px solid #F9F9F9"
          mr="16px"
        >
          <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="2px">
            <Box as="img" src={IconAllState.default} alt="" w="22px" h="22px" mr="8px" />
            <Text>{t('Browing.Status')}</Text>
          </Flex>

          <Flex width="100%" flexFlow="wrap" justifyContent="space-between">
            <StatusSelector statusArr={statusArr} selectedArr={selectedStatusArr} handleSelect={handleSelectStatus} />
          </Flex>
          <Flex h="21px" width="100%" flexDirection="row" alignItems="center" m="22px 0 12px 0">
            <Box as="img" src={IconAllStateone.default} alt="" w="22px" h="22px" mr="8px" />
            <Text>{t('Browing.Collections')}</Text>
          </Flex>
          <InputGroup
            variant="unstyled"
            width="220px"
            height="40px"
            background="#FFFFFF"
            borderRadius="4px"
            border="1px solid #E5E5E5"
            display="flex"
            justifyContent="center"
            alignItems="center"
            p="0px 0 0px 12px"
            m="12px 0 20px 0px"
          >
            <Image w="16px" h="16px" mr="6px" src={IconSearch.default} alt="" />
            <Input
              fontSize="14px"
              fontFamily="TTHoves-Regular, TTHoves"
              fontWeight="400"
              color="#999999"
              placeholder={t('Browing.collectionPlaceholder')}
            />
          </InputGroup>

          <CollectionSelector
            collectionArr={collectionsData!.list}
            selectedArr={selectedCollectionArr}
            handleSelect={handleSelectCollection}
          />
        </Flex>

        <Flex width="1088px" flexDirection="column" justifyContent="flex-start">

          <Flex h="36px">
            <CategorySelector
              list={categoriesData!.list}
              selectId={selectedCategoryId}
              handleSelect={handleSelectCategory}
            />
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
          </Flex>
          <Flex width="1088px" flexFlow="row wrap" justifyContent="space-between">
            {nftsData?.list.map((nft) => <Flex mb="16px"><NftCard nft={nft} /></Flex>)}
          </Flex>
        </Flex>
      </Container>
    </MainContainer>

  );
};

export default Browsing;