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

export const App = () => {
  useEffect(() => {
    polkaSDK.init({
      ss58Format: SS58_FORMAT,
    });
  }, []);
  const { t } = useTranslation();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            {t('title')}
          </Grid>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
