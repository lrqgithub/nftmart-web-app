import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { groupBy } from 'ramda';
import { date } from 'yup/lib/locale';
import FETCH_NFTS_AND_CLASS from '../../graphql/fetchNftsAndClass';
import { useAssetsQuery } from '../../hooks/reactQuery/useAssetsQuery';
import { Work } from '../../polkaSDK/types';
import { filterAssets } from '../../utils/asset';
import { useAppSelector } from '../../hooks/redux';

import Works from './Works';

const Home = () => {
  const { t } = useTranslation();
  const { loading, error, data } = useQuery(FETCH_NFTS_AND_CLASS);

  const STATUS_MAP: Record<number, string> = {
    1: 'listing',
    2: 'new',
    // 3: 'recent',
  };
  console.log(data);

  // const assets = useAppSelector((state) => state.chain.assets);
  // const assets = data;
  // const filteredAssets = filterAssets(assets || [], { status: -1, categoryId: -1, collectionId: -1 });
  // const groupByStatus = groupBy<Work>(({ status }) => STATUS_MAP[status]);
  // type ListMap = Record<string, Work[]>;
  // const [workListMap, setWorkListMap] = useState<ListMap>(groupByStatus(filteredAssets));

  // console.log(workListMap);

  return (
    <>
      {t('title')}
      {/* <Works loading={loading} data={workListMap} /> */}
    </>
  );
};

export default Home;
