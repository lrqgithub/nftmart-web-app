import { useQuery } from 'react-query';
import fetchNfts, { FetchNftParams } from '../../api/fetchNfts';
import { QUERY_KEYS } from '../../constants';

const hot = 'hot';
const expensive = 'expensive';
const cheap = 'cheap';

export default ({
  type, categoryId, collectionId, status, address,
}: FetchNftParams) => useQuery(
  [QUERY_KEYS.NFTS, type, categoryId, collectionId, status],
  () => fetchNfts({
    type, categoryId, collectionId, status, address,
  }),
);

export const useHotNfts = (categoryId?: string) => useQuery(
  [QUERY_KEYS.NFTS, hot, categoryId], () => fetchNfts({ type: hot, categoryId }),
);

export const useExpensiveNfts = (categoryId?: string) => useQuery(
  [QUERY_KEYS.NFTS, expensive, categoryId], () => fetchNfts({ type: expensive, categoryId }),
);

export const useCheapNfts = (categoryId?: string) => useQuery(
  [QUERY_KEYS.NFTS, cheap, categoryId], () => fetchNfts({ type: cheap, categoryId }),
);
