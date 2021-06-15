import React, { FC, useState } from 'react';
import {
  Container, Flex, Button, Image,
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { useSelector } from 'react-redux';
import NavLink from '../Navlink';
import Account from '../Account/index';
import ChangeLanguage from '../ChangeLanguage';
import {
  LogoSrc,
} from '../../assets/images';
import { Z_INDEXES } from '../../constants';
import { store } from '../../redux/store';

export interface HeaderProps {
  sticky?: boolean;
}

const Header: FC<HeaderProps> = ({ sticky }) => {
  const history = useHistory();
  const stateAll = useSelector((state) => state.chain);

  const { t } = useTranslation();
  const { account } = stateAll;

  const formatAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  console.log(account);
  return (
    <Flex
      as="header"
      flex={1}
      justify="space-between"
      backgroundColor="white"
      boxShadow="md"
      height="80px"
      position={sticky ? 'fixed' : 'initial'}
      top={0}
      left={0}
      right={0}
      zIndex={Z_INDEXES.header}
    >
      <Container
        py={2}
        maxW={1280}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          justify="center"
          mr={8}
          // onClick={() => {
          //   history.push('/');
          // }}
        >
          <Image
            display="block"
            width="158px"
            height="auto"
            src={LogoSrc.default}
          />
        </Flex>

        <Flex flex="1 1 auto">
          <NavLink />
        </Flex>
        <ChangeLanguage />
        <Flex>
          {account?.meta ? (
            <Flex
              flex="1 1 auto"
              justifyContent="flex-end"
              alignItems="center"
              height="55px"
              mr={4}
            >
              <Account username={account.address} avatar={account.meta.name} />
            </Flex>
          ) : (
            <Flex>
              <Button
                as="a"
                variant="ghost"
                ml="20px"
                width="107px"
                height="40px"
                background="#5C74FF"
                border-radius="4px"
                fontFamily="PingFangSC-Semibold, PingFang SC"
                fontWeight="600"
                color="#FFFFFF"
                fontSize="16px"
                onClick={() => {
                  history.push('/connect');
                }}
              >
                {t('Login')}
              </Button>
            </Flex>
          )}

        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
