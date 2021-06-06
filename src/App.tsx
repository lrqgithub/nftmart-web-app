import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { QueryClientProvider } from 'react-query';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { queryClient } from './queryClient';
import polkaSDK from './polkaSDK';
import { SS58_FORMAT } from './constants';

import Header from './components/Header';
import Footer from './components/Footer';

export const App = (): JSX.Element => {
  useEffect(() => {
    polkaSDK.init({
      ss58Format: SS58_FORMAT,
    });
  }, []);
  const { t } = useTranslation();
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            {t('title')}
          </Grid>
        </Box>
        <Footer />
      </QueryClientProvider>
    </ChakraProvider>
  );
};
