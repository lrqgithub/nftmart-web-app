import {
  Spinner, Box, SimpleGrid, Container, Button, Center, Stack, StackDivider,
} from '@chakra-ui/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import useNfts from '../../hooks/reactQuery/useNfts';
import MainContainer from '../../layout/MainContainer';
import Works from './Works';

const Home = () => {
  const { t } = useTranslation();
  const {
    error, data, isLoading, refetch,
  } = useNfts();
  if (isLoading) {
    return <Spinner />;
  }

  // Component
  const errorBox = (
    <Container height={300}>
      <Center flexDirection="column" height="100%">
        <Stack>
          Error on fetching data
          <StackDivider />
          <Button variant="primary" onClick={() => refetch()}>
            {t('network.retry')}
          </Button>
        </Stack>
        {/* <Text color={colors.text.gray}>{error?.message}</Text> */}
      </Center>
    </Container>
  );
  return (
    <MainContainer title={t('Home.title')}>
      {error ? errorBox : <Works loading={isLoading} data={data.list} />}
    </MainContainer>
  );
};

export default Home;
