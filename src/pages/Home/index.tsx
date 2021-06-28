import React, { useState, MouseEventHandler } from 'react';
import {
  Spinner, Box, Image, Stack, Flex, Text,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { Test } from 'yup/lib/util/createValidation';
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
    return <Spinner />;
  }

  const handleSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSelectId(event.currentTarget.id);
  };

  return (
    <MainContainer title={t('Home.title')}>
      <Box height="820">
        <Image src={bannerData?.banner} alt="banner" />
      </Box>
      <CategorySelector list={categoriesData!.list} selectId={selectId} handleSelect={handleSelect} />
      <Flex width="100%" justifyContent="center">
        <Flex width="1360px" flexDirection="column">
          <Flex width="100%" flexDirection="column" mt="40px">
            <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="21px">
              <Box as="img" src={IconHome.default} alt="" w="18px" h="18px" mr="8px" />
              <Text>Hottest</Text>
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
                {hotNftsData?.list.map((nft) => <SwiperSlide><NftCard nft={nft} /></SwiperSlide>)}
              </Swiper>
            </Stack>
          </Flex>
          <Flex width="100%" flexDirection="column" mt="40px">
            <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="21px">
              <Box as="img" src={IconHome.default} alt="" w="18px" h="18px" mr="8px" />
              <Text>Hottest</Text>
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
                {expensiveNftsData?.list.map((nft) => <SwiperSlide><NftCard nft={nft} /></SwiperSlide>)}
              </Swiper>
            </Stack>
          </Flex>
          <Flex width="100%" flexDirection="column" mt="40px">
            <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="21px">
              <Box as="img" src={IconHome.default} alt="" w="18px" h="18px" mr="8px" />
              <Text>Hottest</Text>
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
                {cheapNftsData?.list.map((nft) => <SwiperSlide><NftCard nft={nft} /></SwiperSlide>)}
              </Swiper>
            </Stack>
          </Flex>

        </Flex>
      </Flex>
    </MainContainer>
  );
};

export default Home;
