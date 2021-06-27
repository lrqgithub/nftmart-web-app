import React, { useState, MouseEventHandler } from 'react';
import {
  Spinner, Box, Image, Stack,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import CategorySelector from '../../components/CategorySelector';
import NftCard from '../../components/NftCard';
import useBanner from '../../hooks/reactQuery/useBanner';
import { useCheapNfts, useExpensiveNfts, useHotNfts } from '../../hooks/reactQuery/useNfts';
import useCategories from '../../hooks/reactQuery/useCategories';
import MainContainer from '../../layout/MainContainer';

const Home = () => {
  const { t } = useTranslation();
  const [selectId, setSelectId] = useState('');

  const { data: hotNftsData, isLoading: hotNftsIsLoading } = useHotNfts(selectId);
  const { data: expensiveNftsData, isLoading: expensiveNftsIsLoading } = useExpensiveNfts(selectId);
  const { data: cheapNftsData, isLoading: cheapNftsIsLoading } = useCheapNfts(selectId);

  const { data: bannerData, isLoading: bannerIsLoading } = useBanner();
  const { data: categoriesData, isLoading: categoriesIsLoading } = useCategories();

  if (hotNftsIsLoading || expensiveNftsIsLoading || cheapNftsIsLoading || bannerIsLoading || categoriesIsLoading) {
    return <Spinner />;
  }

  const handleSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSelectId(event.currentTarget.id);
  };

  return (
    <MainContainer title={t('Home.title')}>
      <Box height="820">
        <Image src={bannerData?.banner} alt="banner" />
      </Box>
      <CategorySelector list={categoriesData!.list} selectId={selectId} handleSelect={handleSelect} />
      <Stack direction="row">
        {hotNftsData?.list.map((nft) => <NftCard nft={nft} />)}
      </Stack>
      <Stack direction="row">
        {expensiveNftsData?.list.map((nft) => <NftCard nft={nft} />)}
      </Stack>
      <Stack direction="row">
        {cheapNftsData?.list.map((nft) => <NftCard nft={nft} />)}
      </Stack>
    </MainContainer>
  );
};

export default Home;
