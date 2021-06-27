import { useQuery } from 'react-query';
import fetchCollections from '../../api/fetchCollections';
import { QUERY_KEYS } from '../../constants';

export default () => useQuery(QUERY_KEYS.COLLECTIONS, () => fetchCollections());
