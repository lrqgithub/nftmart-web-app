import React, { FC } from 'react';
import {
  Container, Flex, Button, Image,
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import NavLink from '../Navlink';
import AccountPopover from '../AccountPopover';
import ChangeLanguage from '../ChangeLanguage';
import Test from '../Test';
import {
  LogoSrc,
} from '../../assets/images';
import { Z_INDEXES } from '../../constants';
import { useAppSelector } from '../../hooks/redux';

export interface HeaderProps {
  sticky?: boolean;
}
// TODO: replace with Real data
const DATA = {
  balance: 123,
  ownedNft: 123,
  createdNft: 123,
  createdClass: 123,
  address: '8813db97-4e93-4ef1-b473-63ed02456d56',
};

const Header: FC<HeaderProps> = ({ sticky }) => {
  const history = useHistory();
  const chainState = useAppSelector((state) => state.chain);

  const { t } = useTranslation();
  const { account } = chainState;

  const formatAddress = (addr: string) => `${addr.slice(0, 4)}...${addr.slice(-4)}`;

  return (
    <Flex
      as="header"
      justify="space-between"
      backgroundColor="white"
      boxShadow="md"
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={Z_INDEXES.header}
    >
      <Container
        py={2}
        maxW={1360}
        height="80px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Flex
          justify="center"
          mr="10px"
          onClick={() => {
            history.push('/');
          }}
        >
          <Image
            display="block"
            width="158px"
            height="auto"
            src={LogoSrc.default}
          />
        </Flex>
        <Test />
        <Flex flex="1 1 auto">
          <NavLink />
        </Flex>
        <ChangeLanguage />
        <Flex>
          {account ? (
            <Flex
              flex="1 1 auto"
              justifyContent="flex-end"
              alignItems="center"
              height="55px"
              mr={4}
            >
              <AccountPopover username={account.address} avatar={account.meta.name} data={DATA} />
            </Flex>
          ) : (
            <Flex>
              <Button
                as="a"
                variant="ghost"
                ml="20px"
                width="107px"
                height="40px"
                fontFamily="PingFangSC-Semibold, PingFang SC"
                fontWeight="600"
                borderRadius="20px"
                color="#999999"
                fontSize="16px"
                border="1px solid #999999"
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
