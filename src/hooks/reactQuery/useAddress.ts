import { useQuery } from 'react-query';
import fetchAccount from '../../api/fetchAccount';
import { QUERY_KEYS } from '../../constants';

export default (address: string) => useQuery(
  QUERY_KEYS.NFT, () => fetchAccount(address),
);
