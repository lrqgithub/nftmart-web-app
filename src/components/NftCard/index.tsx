import React, { FC, useMemo } from 'react';
import {
  HTMLChakraProps,
  forwardRef,
  ChakraProps,
  chakra,
  ComponentWithAs,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react';
import { motion, MotionProps, isValidMotionProp } from 'framer-motion';
import { Shimmer } from 'react-shimmer';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useTranslation } from 'react-i18next';
import { IPFS_URL } from '../../constants';
import { parseMoneyText } from '../../utils/format';

import {
  PriceIcon,
} from '../../assets/images';

type NftCardProps = {
  nft: NFT
} & HTMLChakraProps<'div'>

export type MotionBoxProps = Omit<ChakraProps, keyof MotionProps> &
  MotionProps & {
    as?: React.ElementType;
  };
export const MotionBox = motion(
  forwardRef<MotionBoxProps, 'div'>((props, ref) => {
    const chakraProps = Object.fromEntries(
      // do not pass framer props to DOM element
      Object.entries(props).filter(([key]) => !isValidMotionProp(key)),
    );
    // FIXME: ref type imcompatible
    return <chakra.div ref={ref as any} {...chakraProps} />;
  }),
) as ComponentWithAs<'div', MotionBoxProps>;

const NftCard: FC<NftCardProps> = ({
  nft: {
    name,
    metadata,
    status,
  },
}) => {
  const { t } = useTranslation();
  const disPrice = useMemo(() => {
    if (!status.price) return 0;
    const { value } = parseMoneyText(String(status.price));
    // TODO: as a component
    const a = parseFloat(Number(value).toFixed(2));
    return `${a}`;
  }, [status.price]);
  return (
    <MotionBox
      width="260px"
      height="310px"
      backgroundColor="#fff"
      borderRadius="4px"
      cursor="pointer"
      _hover={{ boxShadow: 'lg' }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      display="flex"
      flexDirection="column"
    >
      <LazyLoadImage
        wrapperProps={{
          style: {
            width: '260px',
            height: '195px',
            borderBottom: '1px solid #000000',
            display: 'flex',
            justifyContent: 'center',
          },
        }}
        style={{
          objectFit: 'contain',
          maxWidth: '100%',
          maxHeight: '100%',
          borderRadius: '5px',
        }}
        src={IPFS_URL + metadata.url}
        effect="none"
        fallback={<Shimmer height={195} width={260} />}
        fadeIn
      />
      <Box h="115px" display="flex" flexDirection="column" backgroundColor="#000000">
        <Box
          mt="16px"
          display="flex"
          justifyContent="space-between"
          p="0 16px"
          height="17px"
          lineHeight="17px"
          fontSize="12px"
          color="#FFFFFF"
        >
          <Box userSelect="none">{t('componentCollectionTitle')}</Box>
          {status.price && (
            <Box userSelect="none" flex="1" textAlign="right">
              {t('componentCollectionPrice')}
            </Box>
          )}
        </Box>
        <Box
          mt="8px"
          display="flex"
          justifyContent="space-between"
          padding="0 16px 16px 16px"
          paddingBottom=""
          fontWeight="600"
          color="#000000"
        >
          <Box pr={2}>
            <Text
              width="130px"
              color="#FFFFFF"
              align="center"
              fontSize="16px"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              textAlign="start"
            >
              {metadata.name}
            </Text>
          </Box>
          {status.price && (
            <Box textAlign="right" display="flex" justifyContent="center">
              <Flex align="flex-start" alignItems="center">
                <Box w="14px" h="14px" src={PriceIcon.default} as="img" alt="" mr="4px" />
                <Box color="#FFFFFF">{disPrice}</Box>
              </Flex>
            </Box>
          )}
        </Box>
      </Box>
    </MotionBox>

  );
};

export default NftCard;
