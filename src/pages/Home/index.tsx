import React, { useState, MouseEventHandler } from 'react';
import {
  Spinner,
  Box,
  Image,
  Stack,
  Flex,
  Text,
  Button,
  Center,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Scrollbar,
} from 'swiper';
import CategorySelector from '../../components/CategorySelector';
import NftCard from '../../components/NftCard';
import useBanner from '../../hooks/reactQuery/useBanner';
import { useCheapNfts, useExpensiveNfts, useHotNfts } from '../../hooks/reactQuery/useNfts';
import useCategories from '../../hooks/reactQuery/useCategories';
import MainContainer from '../../layout/MainContainer';

import {
  IconHome,
} from '../../assets/images';

import 'swiper/swiper.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
// install Swiper modules
SwiperCore.use([Scrollbar]);

const Home = () => {
  const { t } = useTranslation();
  const [selectId, setSelectId] = useState('');

  const { data: hotNftsData, isLoading: hotNftsIsLoading } = useHotNfts(selectId);
  const { data: expensiveNftsData, isLoading: expensiveNftsIsLoading } = useExpensiveNfts(selectId);
  const { data: cheapNftsData, isLoading: cheapNftsIsLoading } = useCheapNfts(selectId);

  const { data: bannerData, isLoading: bannerIsLoading } = useBanner();
  const { data: categoriesData, isLoading: categoriesIsLoading } = useCategories();

  if (hotNftsIsLoading || expensiveNftsIsLoading || cheapNftsIsLoading || bannerIsLoading || categoriesIsLoading) {
    return (
      <Center height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }
  const handleSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSelectId(event.currentTarget.id);
  };

  return (
    <MainContainer title={t('Home.title')}>
      <Flex
        w="100vw"
        height="820px"
        background="#000000"
        justifyContent="center"
        position="relative"
        mb="40px"
      >
        <Image maxWidth="1360px" width="100%" src={bannerData?.banner} alt="banner" />
        <Flex
          color="white"
          flexDirection="column"
          w="579px"
          alignItems="flex-start"
          justifyContent="flex-start"
          position="absolute"
          top="19.7%"
          left="19.7%"
          right={0}
          bottom={0}
          p={4}
        >
          <Text
            fontSize="64px"
            fontFamily="TTHoves-Thin, TTHoves"
            fontWeight="100"
            color="#FFFFFF"
            lineHeight="75px"
          >
            {t('banner.titleOne')}
          </Text>
          <Text
            w="579px"
            fontFamily="TTHoves-Bold, TTHoves"
            fontWeight="bold"
            color="#FFFFFF"
            lineHeight="75px"
            letterSpacing="2px"
            fontSize="64px"
          >
            {t('banner.titleTwo')}
          </Text>
          <Text
            mt="3px"
            w="579px"
            fontFamily="TTHoves-Bold, TTHoves"
            fontWeight="100"
            color="#999999"
            lineHeight="29px"
            letterSpacing="2px"
            fontSize="24px"
          >
            {t('banner.content')}
          </Text>
          <Button
            mt="35px"
            width="200px"
            height="60px"
            background="#FFFFFF"
            borderRadius="4px"
            fontsize="20px"
            fontFamily="TTHoves-Bold, TTHoves"
            fontWeight="bold"
            color="#000000"
          >
            {t('banner.button')}
          </Button>
        </Flex>
      </Flex>
      {categoriesData
        ? <CategorySelector list={categoriesData.data.categories} selectId={selectId} handleSelect={handleSelect} />
        : ''}

      <Flex width="100%" justifyContent="center">
        <Flex width="1360px" flexDirection="column">
          {hotNftsData?.data.orders.length
            ? (
              <Flex width="100%" flexDirection="column" mt="40px">
                <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="21px">
                  <Box as="img" src={IconHome.default} alt="" w="18px" h="18px" mr="8px" />
                  <Text>{t('home.Hottest')}</Text>
                </Flex>
                <Stack direction="row" height="364px">
                  <Swiper
                    scrollbar={{ draggable: true }}
                    slidesPerView={5}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 4,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                    className="mySwiper"
                  >

                    {hotNftsData.data.orders.map((nft) => <SwiperSlide><NftCard nft={nft} /></SwiperSlide>)}
                  </Swiper>
                </Stack>
              </Flex>
            )
            : null}
          {expensiveNftsData?.data.orders ? (
            <Flex width="100%" flexDirection="column" mt="40px">
              <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="21px">
                <Box as="img" src={IconHome.default} alt="" w="18px" h="18px" mr="8px" />
                <Text>{t('home.Expensive')}</Text>
              </Flex>
              <Stack direction="row" height="364px">
                <Swiper
                  scrollbar={{ draggable: true }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                    },
                    768: {
                      slidesPerView: 4,
                    },
                    1024: {
                      slidesPerView: 5,
                    },
                  }}
                  className="mySwiper"
                >
                  {expensiveNftsData?.data.orders.map((nft) => <SwiperSlide><NftCard nft={nft} /></SwiperSlide>)}
                </Swiper>
              </Stack>
            </Flex>
          ) : null}
          {expensiveNftsData?.data.orders
            ? (
              <Flex width="100%" flexDirection="column" mt="40px">
                <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="21px">
                  <Box as="img" src={IconHome.default} alt="" w="18px" h="18px" mr="8px" />
                  <Text>{t('home.Cheapest')}</Text>
                </Flex>
                <Stack direction="row" height="364px">
                  <Swiper
                    scrollbar={{ draggable: true }}
                    breakpoints={{
                      640: {
                        slidesPerView: 2,
                      },
                      768: {
                        slidesPerView: 4,
                      },
                      1024: {
                        slidesPerView: 5,
                      },
                    }}
                    className="mySwiper"
                  >
                    {cheapNftsData?.data.orders.map((nft) => <SwiperSlide><NftCard nft={nft} /></SwiperSlide>)}
                  </Swiper>
                </Stack>
              </Flex>
            )
            : null}

        </Flex>
      </Flex>
    </MainContainer>
  );
};

export default Home;
