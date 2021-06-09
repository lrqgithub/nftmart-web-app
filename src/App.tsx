import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';
import polkaSDK from './polkaSDK';
import { SS58_FORMAT } from './constants';
import Router from './router';

export const App = (): JSX.Element => {
  useEffect(() => {
    polkaSDK.init({
      ss58Format: SS58_FORMAT,
    });
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </ChakraProvider>
  );
};
