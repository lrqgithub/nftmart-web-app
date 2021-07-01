import React from 'react';
import { Center } from '@chakra-ui/react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';

interface Props {
  children: React.ReactNode;
  title: string;
}

const MainContainer = ({ children, title }: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <Helmet>{title && <title>{t(title)}</title>}</Helmet>
      <Center as="main" maxWidth="1360px" width="100%" pt="80px" boxSizing="border-box" flexDirection="column">
        {children}
      </Center>
    </>
  );
};

export default MainContainer;
