import { Spinner, Box } from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import NftCard from '../../components/NftCard';
import useNfts from '../../hooks/reactQuery/useNfts';
import MainContainer from '../../layout/MainContainer';

const Home = () => {
  const { t } = useTranslation();
  const { data, isLoading } = useNfts();
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <MainContainer title={t('Home.title')}>
      <Box display="flex" flexDirection="row">
        {data?.list.map((nft) => <NftCard nft={nft} />)}
      </Box>
    </MainContainer>
  );
};

export default Home;
