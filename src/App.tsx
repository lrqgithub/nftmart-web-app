import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import {
  ApolloProvider,
} from '@apollo/client';

import theme from './themes';

import { queryClient } from './apiClient/reactQueryClient';
import Router from './router';
import PolkaProvider from './polkaSDK/PolkaProvider';
import { client } from './apiClient/apolloClient';

export const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <ApolloProvider client={client}>
        {/* <PolkaProvider> */}
        <Router />
        {/* </PolkaProvider> */}
      </ApolloProvider>
    </QueryClientProvider>
  </ChakraProvider>
);
