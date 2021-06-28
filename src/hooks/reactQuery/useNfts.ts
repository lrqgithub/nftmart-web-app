import { useQuery } from 'react-query';
import fetchNfts from '../../api/fetchNfts';
import { QUERY_KEYS } from '../../constants';

const hot = 'hot';
const expensive = 'expensive';
const cheap = 'cheap';

export default (type?: string, category?: string, collection?: string[], status?: string[]) => useQuery(
  QUERY_KEYS.NFTS, () => fetchNfts(type, category, collection, status),
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
