import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { QueryClientProvider } from 'react-query';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { queryClient } from './queryClient';
import polkaSDK from './polkaSDK';
import { SS58_FORMAT } from './constants';
import Router from './router';

import Header from './components/Header';
import Footer from './components/Footer';

export const App = (): JSX.Element => {
  useEffect(() => {
    polkaSDK.init({
      ss58Format: SS58_FORMAT,
    });
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <Router />
          </Grid>
        </Box>
        <Footer />
      </QueryClientProvider>
    </ChakraProvider>
  );
};
