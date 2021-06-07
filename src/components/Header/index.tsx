import React, { FC, useState } from 'react';
import {
  Container, Flex, Button, Image,
} from '@chakra-ui/react';

import { useTranslation } from 'react-i18next';

import NavLink from '../Navlink';
import Login from '../Login';
import ChangeLanguage from '../ChangeLanguage';
import {
  LogoSrc,
} from '../../assets/images';
import { Z_INDEXES } from '../../constants';

export interface HeaderProps {
  sticky?: boolean;
}

const Header: FC<HeaderProps> = ({ sticky }) => {
  const { t } = useTranslation();
  // const { hasCopied, onCopy } = useClipboard(account ? account.address : '');
  // const [loading, setLoading] = useState(false);
  // const toast = useToast();
  // useEffect(() => {
  //   if (account?.address && api) {
  //     api.isReady.then(() => getBalance(account.address));
  //   }

  //   return () => {
  //     // cleanup
  //   };
  // }, [account?.address, api]);

  // const handleCopy = () => {
  //   toast({
  //     title: 'success',
  //     status: 'success',
  //     position: 'top',
  //     duration: 3000,
  //     description: t('copy.success'),
  //   });
  //   // onCopy();
  // };

  // const getFaucet = () => {
  //   const faucet = async () => {
  //     setLoading(true);
  //     const ss58Format = 50;
  //     const keyring = new Keyring({ type: 'sr25519', ss58Format });
  //     const alice = keyring.addFromUri('//Alice');
  //     const res = await api.tx.balances
  //       .transfer(account.address, '2100000000000000')
  //       .signAndSend(alice, (result: any) => {
  //         txLog(result, () => {
  //           toast({
  //             title: 'success',
  //             status: 'success',
  //             position: 'top',
  //             duration: 3000,
  //             description: t('fund.success'),
  //           });
  //           getBalance(account.address);
  //           setLoading(false);
  //         });
  //       });
  //   };

  //   return (
  //     <Button isLoading={loading} m={3} size="xs" variant="outline" onClick={faucet}>
  //       Faucet
  //     </Button>
  //   );
  // };

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
          {1 ? (
            <Flex
              flex="1 1 auto"
              justifyContent="flex-end"
              alignItems="center"
              height="55px"
              mr={4}
            >

              <Login username="lrq" avatar="111111" />

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
                // onClick={() => {
                //   history.push('/connect');
                // }}
              >
                {t('login')}
              </Button>
            </Flex>
          )}

        </Flex>
      </Container>
    </Flex>
  );
};

export default Header;
