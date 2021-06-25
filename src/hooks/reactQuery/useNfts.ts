import { useQuery } from 'react-query';
import fetchNfts from '../../api/fetchNfts';
import { NFTS } from '../../constants';

export default (type?: string) => useQuery(NFTS, () => fetchNfts(type));
