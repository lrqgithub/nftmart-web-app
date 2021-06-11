import React, { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Stack,
  Portal,
  Text,
  Flex,
  useToast,
  Icon,
  Image,
  useClipboard,
} from '@chakra-ui/react';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';

import { useTranslation } from 'react-i18next';
import { USER_LINKS } from '../../constants';
// import NLink from '../Link';

import {
  HeadPortrait,
} from '../../assets/images';

export interface LoginProps {
  avatar?: string;
  username?: string;
}

const Login: FC<LoginProps> = ({ avatar, username = 'no name' }) => {
  const location = useLocation();
  const account = username;
  // const { whiteList } = store.useState('whiteList');

  const { t } = useTranslation();
  const [opening, setOpening] = useState(false);
  const [copyshow, oncopyshow] = useState(false);
  const { hasCopied, onCopy } = useClipboard(account || '');
  // const [hideMenu, setHideMenu] = useState(false);
  const toast = useToast();
  const handleCopy = () => {
    toast({
      title: 'success',
      status: 'success',
      position: 'top',
      duration: 3000,
      description: t('copy.success'),
    });
    onCopy();
  };

  // Link render helper
  const renderLink = (title: string) => (
    <Flex width="100%" height="48px" justifyContent="space-between" alignItems="center">
      <Flex width="100%" justifyContent="space-between" mr="31px">
        <Flex width="100%" justifyContent="flex-start" alignItems="center">
          <Image
            width="14px"
            height="14px"
            mr="9px"
            src={HeadPortrait.default}
          />
          <Text
            fontSize="14px"
            fontFamily="PingFangSC-Regular, PingFang SC"
            fontWeight="blod"
            color="#191A24"
          >
            {t(title)}
          </Text>
        </Flex>
        <Text
          fontSize="14px"
          fontFamily="PingFangSC-Regular, PingFang SC"
          fontWeight="400"
          color="#858999"
        >
          283746.32
        </Text>
      </Flex>
      <Text
        fontSize="16px"
        fontFamily="PingFangSC-Medium, PingFang SC"
        fontWeight="500"
        color="#5C74FF"
      >
        NMT
      </Text>
    </Flex>
  );

  // Menus
  const menus = (<Stack width="100%">{Object.keys(USER_LINKS).map(renderLink)}</Stack>);

  return (
    <Popover
      placement="bottom"
      size="sm"
      variant="menu"
      isOpen={opening}
      onOpen={() => setOpening(true)}
      onClose={() => setOpening(false)}
    >
      <PopoverTrigger>
        <Stack direction="row" cursor="pointer" alignItems="center" spacing={0}>
          <Image
            ml="40px"
            display="block"
            width="32px"
            height="32px"
            mr="8px"
            src={HeadPortrait.default}
          />
          <Text
            fontSize="16px"
            fontFamily="PingFangSC-Medium, PingFang SC"
            fontWeight="500"
            color="#191A24"
          >
            {avatar}
          </Text>
          {opening ? <Icon as={IoMdArrowDropup} /> : <Icon as={IoMdArrowDropdown} />}
        </Stack>
      </PopoverTrigger>
      <Portal>
        {/* TODO: Move focus property else where to have common use */}
        <PopoverContent
          mt="12px"
          width="372px"
          _focus={{ boxShadow: 'none' }}
          outline="none"
          position="relative"
          right="110px"
          boxShadow="0px 0px 6px 0px rgba(0, 0, 0, 0.16)"
        >
          <PopoverArrow left="121px !important" />
          <PopoverBody display="flex" flexFlow="wrap" p="20px">
            <Flex width="100%" height="48px" justifyContent="space-between" alignItems="center">
              <Flex width="100%" justifyContent="space-between" mr="31px">
                <Flex width="100%" justifyContent="flex-start" alignItems="center">
                  <Image
                    width="14px"
                    height="14px"
                    mr="9px"
                    src={HeadPortrait.default}
                  />
                  <Text
                    fontSize="14px"
                    fontFamily="PingFangSC-Regular, PingFang SC"
                    fontWeight="blod"
                    color="#191A24"
                  >
                    Balance
                  </Text>

                </Flex>
                <Text
                  fontSize="14px"
                  fontFamily="PingFangSC-Regular, PingFang SC"
                  fontWeight="400"
                  color="#858999"
                >
                  283746.32
                </Text>
              </Flex>
              <Text
                fontSize="16px"
                fontFamily="PingFangSC-Medium, PingFang SC"
                fontWeight="500"
                color="#858999"
              >
                NMT
              </Text>
            </Flex>
            {menus}
            <Flex width="100%" height="48px" justifyContent="space-between" alignItems="center">
              <Flex width="100%" justifyContent="space-between">
                <Flex justifyContent="flex-start" alignItems="center">
                  <Image
                    width="14px"
                    height="14px"
                    mr="9px"
                    src={HeadPortrait.default}
                  />
                  <Text
                    fontSize="14px"
                    fontFamily="PingFangSC-Regular, PingFang SC"
                    fontWeight="blod"
                    color="#191A24"

                  >
                    Address
                  </Text>

                </Flex>
                <Text
                  fontSize="16px"
                  fontFamily="PingFangSC-Semibold, PingFang SC"
                  fontWeight="600"
                  color="#5C74FF"
                  onClick={() => oncopyshow(!copyshow)}
                >
                  View in Scan
                </Text>
              </Flex>
            </Flex>
            {copyshow ? (
              <Flex
                p="10px"
                width="332px"
                flexFlow="wrap"
                justifyContent="flex-start"
                alignItems="center"
                background="#F8F8F9"
                borderRadius="2px"
              >
                <Text
                  width="312px"
                  fontSize="12px"
                  fontFamily="PingFangSC-Regular, PingFang SC"
                  fontWeight="400"
                  color="#858999"
                >
                  {account}
                </Text>
                <Text
                  mt="4px"
                  fontSize="12px"
                  fontFamily="PingFangSC-Regular, PingFang SC"
                  fontWeight="400"
                  color="#5C74FF"
                  onClick={() => handleCopy()}
                >
                  Click to copy
                </Text>
              </Flex>
            ) : ''}

          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Login;
