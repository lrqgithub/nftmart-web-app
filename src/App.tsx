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
import Router from './router';

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Router />
        </Grid>
      </Box>
    </ChakraProvider>
  </QueryClientProvider>
);
