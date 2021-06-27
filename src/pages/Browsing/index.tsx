import React, { useState, MouseEventHandler } from 'react';
import { Spinner, Stack } from '@chakra-ui/react';
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

const statusArr = ['buyNow', 'onAuction', 'newListing', 'hasOffers'];

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
      <CategorySelector list={categoriesData!.list} selectId={selectedCategoryId} handleSelect={handleSelectCategory} />
      <StatusSelector statusArr={statusArr} selectedArr={selectedStatusArr} handleSelect={handleSelectStatus} />
      <CollectionSelector
        collectionArr={collectionsData!.list}
        selectedArr={selectedCollectionArr}
        handleSelect={handleSelectCollection}
      />
      <Stack direction="row">
        {nftsData?.list.map((nft) => <NftCard nft={nft} />)}
      </Stack>
    </MainContainer>
  );
};

export default Browsing;
