import { useQuery } from '@apollo/client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FETCH_NFTS_AND_CLASS from '../../graphql/fetchNftsAndClass';

const Home = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(FETCH_NFTS_AND_CLASS);
  console.log(data);

  return (
    <>
      {t('title')}
    </>
  );
};

export default Home;
