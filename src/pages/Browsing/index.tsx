import React, { useState, MouseEventHandler } from 'react';
import {
  Spinner,
  Flex,
  Container,
  Box,
  Text,
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

import {
  IconHome,
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
    return <Spinner />;
  }
  return (
    <MainContainer title={t('Browsing.title')}>
      <Container mt="120px" display="flex">
        <Flex
          w="260px"
          flexFlow="wrap"
          justifyContent="space-between"
          background="#F9F9F9"
          borderRadius="4px"
          p="20px"
          border="1px solid #F9F9F9"
          mr="16px"
        >
          <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="2px">
            <Box as="img" src={IconHome.default} alt="" w="22px" h="22px" mr="8px" />
            <Text>Status</Text>
          </Flex>
          <Flex width="100%" flexFlow="wrap" justifyContent="space-between">
            <StatusSelector statusArr={statusArr} selectedArr={selectedStatusArr} handleSelect={handleSelectStatus} />
          </Flex>
          <Flex h="21px" width="100%" flexDirection="row" alignItems="center" m="22px 0 12px 0">
            <Box as="img" src={IconHome.default} alt="" w="22px" h="22px" mr="8px" />
            <Text>Collections</Text>
          </Flex>
          <CollectionSelector
            collectionArr={collectionsData!.list}
            selectedArr={selectedCollectionArr}
            handleSelect={handleSelectCollection}
          />
        </Flex>
        <Flex width="1088px" flexFlow="wrap" justifyContent="space-between">
          <CategorySelector list={categoriesData!.list} selectId={selectedCategoryId} handleSelect={handleSelectCategory} />
          <Flex width="1088px" flexFlow="row wrap" justifyContent="space-between">
            {nftsData?.list.map((nft) => <Flex mb="16px"><NftCard nft={nft} /></Flex>)}
          </Flex>
        </Flex>
      </Container>
    </MainContainer>

  );
};

export default Browsing;
