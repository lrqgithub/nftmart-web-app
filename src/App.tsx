import * as React from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { ColorModeSwitcher } from './ColorModeSwitcher';

import Header from './components/header';
import Footer from './components/footer';

export const App = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          {t('title')}
        </Grid>
      </Box>
      <Footer />
    </ChakraProvider>
  );
};
