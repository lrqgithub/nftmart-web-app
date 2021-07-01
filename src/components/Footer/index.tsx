import {
  Box, Flex, Text,
} from '@chakra-ui/react';
import React from 'react';
import {
  GithubLogo,
  GithubLogoHover,
  TwitterLogo,
  MediumLogo,
  TwitterLogoHover,
  MediumLogoHover,
  TelegramLogo,
  TelegramLogoHover,
  Url,
  UrlHover,
} from '../../assets/images';

const ICONS = [
  { icon: Url, hover: UrlHover },
  { icon: MediumLogo, hover: MediumLogoHover },
  { icon: TwitterLogo, hover: TwitterLogoHover },
  { icon: TelegramLogo, hover: TelegramLogoHover },
  { icon: GithubLogo, hover: GithubLogoHover },
];

const links = [
  'https://www.nftmart.io/',
  'https://nftmart-io.medium.com/',
  'https://twitter.com/NFTmartio',
  'https://t.me/NFTmart',
  'https://github.com/NFTT-studio',
];

const ICON_LIST = ICONS.map((title, index) => ({
  src: ICONS[index].icon,
  hoverSrc: ICONS[index].hover,
  id: index,
  link: links[index],
}));

export default function Footer() {
  const iconList = ICON_LIST;

  return (
    <Box
      as="footer"
      flex={1}
      display="flex"
      justifyContent="center"
      minHeight="92px"
      backgroundColor="#191A24"
      border="1px solid #979797"
      className="page-footer"
    >
      <Flex
        p="0"
        width="100%"
        maxWidth="1360px"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box maxW="80%" minW="40%" display="flex" flexFlow="row" mr="20px">
          <Text lineHeight="20px" fontWeight="500" fontSize="14px" color="#61688A" mr="15px">
            © 2021 NFTMart
          </Text>
          <Text color="#C7CCE6" fontSize="14px">
            Privacy Policy
          </Text>
        </Box>
        <Box maxW="50%" minW="20%">
          <Box display="flex" ml="0px">
            {iconList.map(({
              id, src, hoverSrc, link,
            }) => (
              <Box
                ml={id !== 0 ? '30px' : 0}
                role="group"
                key={src.default}
                onClick={() => window.open(link, '_blank')}
              >
                <Box
                  as="img"
                  alt=""
                  src={src.default}
                  width="32px"
                  cursor="pointer"
                  _groupHover={{ display: 'none' }}
                />
                <Box
                  as="img"
                  alt=""
                  display="none"
                  src={hoverSrc.default}
                  width="32px"
                  cursor="pointer"
                  _groupHover={{ display: 'block' }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
