import React, { FC } from 'react';
import {
  Box, Center, Container, SimpleGrid, Skeleton, Spinner, HTMLChakraProps,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Empty from '../../../components/Empty';
import { Colors } from '../../../constants';
import { Work } from '../../../polkaSDK/types';
import NftCard from '../../../components/NftCard';

import {
  IconSj,
  IconCj,
  IconClinch,
  IconRight,
} from '../../../assets/images';

type PartWorksProps = {
  title: string;
  icon: React.ReactNode;
  link: string;
  typicalList: any;
};

type PartHeaderProps = {
  title: string;
  icon: any;
  link: string;
};

type WorksProps = {
  loading: boolean;
  data: NFT
} & HTMLChakraProps<'div'>

const Works: FC<WorksProps> = ({ loading, data }) => {
  const { t } = useTranslation();

  const partList = [
    {
      key: 'listing',
      title: t('navListSale'),
      icon: IconSj.default,
      link: '/explore?status=listing',
    },
    {
      key: 'new',
      title: t('navLatestCreate'),
      icon: IconCj.default,
      link: '/explore?status=new',
    },
    {
      key: 'recent',
      title: t('navLatestStrike'),
      icon: IconClinch.default,
      link: '/explore?status=recent',
    },
  ].map((item) => {
    const assets = data || [];
    return {
      ...item,
      list: assets,
    };
  });

  const PartHeader = (props: PartHeaderProps) => {
    const { title, icon, link } = props;

    return (
      <Box
        display="flex"
        height="30px"
        alignItems="flex-end"
        justifyContent="space-between"
        marginBottom="30px"
      >
        <Box display="flex" height="100%" alignItems="center">
          {/* TODO: Update image source to have more clearness by using svg etc... */}
          <Box as="img" src={icon} alt="" width={7} height={7} mr="8px" />
          <Box color="#232A4A" fontSize="22px" fontWeight="600" lineHeight="30px">
            {title}
          </Box>
        </Box>
        <Box display="flex" alignItems="center" cursor="pointer">
          <Link to={link}>
            <Box
              as="a"
              lineHeight="20px"
              display="block"
              height="20px"
              color={Colors.Black}
              fontSize="14px"
            >
              {t('Home.more')}
            </Box>
          </Link>
          <Box
            as="img"
            src={IconRight.default}
            alt=""
            width="14px"
            height="14px"
            transform="translateY(2px)"
          />
        </Box>
      </Box>
    );
  };

  const PartWorks = (props: PartWorksProps) => {
    const {
      title, typicalList, icon, link,
    } = props;

    return (
      <Box marginBottom={10}>
        <PartHeader title={title} icon={icon} link={link} />
        <SimpleGrid columns={4} spacing={4}>
          {typicalList.map((item) => (
            <NftCard nft={item} />
          ))}
        </SimpleGrid>
      </Box>
    );
  };

  const loadingNode = (
    <Center height="40vh">
      <Spinner thickness="4px" speed="0.65s" emptyColor="Colors.gray.200" color="blue.500" size="xl" />
    </Center>
  );

  return (
    <Box p="40px 0">
      <Container axWidth="1280px">
        {!Object.keys(data).length && loading && loadingNode}

        {!Object.keys(data).length && !loading && <Empty description={t('home.empty')} />}

        {!!Object.keys(data).length
          && partList.map(({
            title, link, icon, list,
          }) => (1 ? (
            <Skeleton isLoaded={!loading} key={title} m>
              <PartWorks title={title} typicalList={list} icon={icon} link={link} />
            </Skeleton>
          ) : null))}
      </Container>
    </Box>
  );
};

export default Works;
