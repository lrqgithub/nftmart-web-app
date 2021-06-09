import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './queryClient';
import Router from './router';

export const App = (): JSX.Element => (
  <ChakraProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  </ChakraProvider>
);
