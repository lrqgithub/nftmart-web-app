import { useQuery } from 'react-query';
import { MY_COLLECTIONS_QUERY } from '../../constants/QueryKeys';
import { queryClassByAddress } from '../../polkaSDK/api/queryClassByAddress';
import { Collection } from '../../polkaSDK/types';

export const useMyCollectionsQuery = (address: string) => {
  const queryClassesAndMap = async () => {
    const classes = await queryClassByAddress({ address });
    return classes;
  };

  return useQuery<Collection[]>(MY_COLLECTIONS_QUERY, queryClassesAndMap as any);
};
