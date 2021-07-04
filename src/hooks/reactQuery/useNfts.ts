import { useQuery } from 'react-query';
import fetchNfts from '../../api/fetchNfts';
import { QUERY_KEYS } from '../../constants';

const hot = 'hot';
const expensive = 'expensive';
const cheap = 'cheap';

type QueryParams = {
  type?: string,
  category?: string,
  collection?: string[],
  status?: string[]
}

export default ({
  type, category, collection, status,
}: QueryParams) => useQuery(
  [QUERY_KEYS.NFTS, type, category, collection, status],
  () => fetchNfts(type, category, collection, status),
);

export const useHotNfts = (category?: string) => useQuery(
  [QUERY_KEYS.NFTS, hot, category], () => fetchNfts(hot, category),
);

export const useExpensiveNfts = (category?: string) => useQuery(
  [QUERY_KEYS.NFTS, expensive, category], () => fetchNfts(expensive, category),
);

export const useCheapNfts = (category?: string) => useQuery(
  [QUERY_KEYS.NFTS, cheap, category], () => fetchNfts(cheap, category),
);
