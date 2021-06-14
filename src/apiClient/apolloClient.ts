import {
  ApolloClient,
  InMemoryCache,
} from '@apollo/client';
import { URL } from '../constants';

export const client = new ApolloClient({
  uri: URL.GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});
