import React, { useState, MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Tabs, TabList, TabPanels, Tab, TabPanel, Flex,
  Center,
  Spinner,
  Box,
  Text,
  Image,
  InputGroup,
  Input,
  Container,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { union, without } from 'lodash';
import MainContainer from '../../layout/MainContainer';
import useNfts from '../../hooks/reactQuery/useNfts';
import useCategories from '../../hooks/reactQuery/useCategories';
import CategorySelector from '../../components/CategorySelector';
import NftCard from '../../components/NftCard';
import {
  IconAllState,
  IconAllStateone,
  IconSearch,
  AccountBanner,
  IconPen,
  IconDetailshaSre,
  Img,
  IconOffers,
  IconWallet,
  IconCreate,
  IconDetailsocllections,
  IconOffersS,
  IconWalletS,
  IconDetailsocllectionsS,
  ImgAdd,
} from '../../assets/images';
import CollectionSelector from '../../components/CollectionSelector';
import SortBy from '../../components/SortBy';
import StatusSelector from '../../components/StatusSelector';
import { statusArr } from '../../constants/Status';
import useCollections from '../../hooks/reactQuery/useCollections';

const TABS = [
  {
    id: '0', icon: IconWallet.default, iconS: IconWalletS.default, title: 'My wallet',
  },
  {
    id: '1', icon: IconOffers.default, iconS: IconOffersS.default, title: 'Offers',
  },
  {
    id: '2', icon: IconDetailsocllections.default, iconS: IconDetailsocllectionsS.default, title: 'collections',
  },
];
const offersMadeButton = [
  {
    id: '0', title: 'Offers Made',
  },
  {
    id: '1', title: 'Offers Made',
  },
];
const offersMadeArr = [
  {
    id: '0',
  },
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
  {
    id: '5',
  },
];
const collectionsArr = [1, 2, 3, 4, 5, 6];

const Account = () => {
  const { t } = useTranslation();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [selectedStatusArr, setSelectedStatusArr] = useState<string[]>([]);
  const [selectedCollectionArr, setSelectedCollectionArr] = useState<string[]>([]);
  const { data, isLoading } = useNfts({});

  const [selectTabId, setSelectTabId] = useState(0);
  const handletabSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSelectTabId(Number(event.currentTarget.id));
  };

  const [offersMadeButtonId, setoffersMadeButtonId] = useState(0);
  const handleButtonSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    setoffersMadeButtonId(Number(event.currentTarget.id));
  };

  const { data: categoriesData, isLoading: categoriesIsLoading } = useCategories();
  const { data: collectionsData, isLoading: collectionsIsLoading } = useCollections();
  const { data: nftsData, isLoading: nftsIsLoading } = useNfts(
    { category: selectedCategoryId, collection: selectedCollectionArr, status: selectedStatusArr },
  );

  const handleSelectCategory: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSelectedCategoryId(event.currentTarget.id);
  };

  const handleSelectStatus: MouseEventHandler<HTMLButtonElement> = (event) => {
    const clickedStatus = event.currentTarget.id;
    setSelectedStatusArr(
      selectedStatusArr.indexOf(clickedStatus) > -1
        ? without(selectedStatusArr, event.currentTarget.id)
        : union(selectedStatusArr, [event.currentTarget.id]),
    );
  };

  const handleSelectCollection: MouseEventHandler<HTMLButtonElement> = (event) => {
    const clickedCollection = event.currentTarget.id;
    setSelectedCollectionArr(
      selectedCollectionArr.indexOf(clickedCollection) > -1
        ? without(selectedCollectionArr, event.currentTarget.id)
        : union(selectedCollectionArr, [event.currentTarget.id]),
    );
  };

  if (categoriesIsLoading || collectionsIsLoading || nftsIsLoading) {
    return (
      <Center height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }

  return (
    <MainContainer title={t('Home.title')}>
      <Flex
        w="100%"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        position="relative"
        top="20px"
      >
        <Image w="100%" h="180px" src={AccountBanner.default} alt="" />
        <Flex
          w="100%"
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="center"
          position="relative"
          top="-60px"
        >
          <Image
            width="120px"
            height="120px"
            border="3px solid #FFFFFF"
            borderRadius="50%"
            src={Img.default}
            alt=""
          />
          <Text
            mt="20px"
            fontSize="28px"
            fontFamily="TTHoves-Bold, TTHoves"
            fontWeight="bold"
            color="#191A24"
            lineHeight="33px"
          >
            NickName
          </Text>
          <Text
            mt="12px"
            fontSize="14px"
            fontFamily="TTHoves-Regular, TTHoves"
            fontWeight="400"
            color="#999999"
            lineHeight="16px"
          >
            0x4aa81e6baab4c1713e8b18112ed854cb182ba631

          </Text>
        </Flex>
        <Flex position="absolute" right="20px" top="240px">
          <Box
            key="index"
            width="40px"
            height="40px"
            borderRadius="4px 0px 0px 4px"
            border="1px solid #E5E5E5"
            display="flex"
            justifyContent="center"
            alignItems="center"
            _hover={{
              boxShadow: '0px 2px 8px 0px #E1E1E1',
            }}
          >
            <Image
              w="22px"
              h="22px"
              src={IconPen.default}
            />
          </Box>
          <Box
            key="index"
            width="40px"
            height="40px"
            borderRadius="0px 4px 4px 0px"
            border="1px solid #E5E5E5"
            display="flex"
            justifyContent="center"
            alignItems="center"
            _hover={{
              boxShadow: '0px 2px 8px 0px #E1E1E1',
            }}
          >
            <Image
              w="22px"
              h="22px"
              src={IconDetailshaSre.default}
            />
          </Box>
        </Flex>
      </Flex>
      <Tabs w="100%">
        <TabList
          w="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          {TABS.map((item, index) => (
            <Button
              key={item.id}
              id={item.id}
              mr="40px"
              mb="23px"
              height="36px"
              borderRadius="2px"
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center"
              onClick={handletabSelect}
              backgroundColor={selectTabId === index ? '#000000' : '#FFFFFF'}
            >
              <Image w="22px" h="22px" mr="5px" src={selectTabId === index ? item.iconS : item.icon} alt="" />
              <Text
                fontSize="16px"
                fontFamily="TTHoves-Medium, TTHoves"
                fontWeight="500"
                color={selectTabId === index ? '#FFFFFF' : '#191A24'}
                lineHeight="18px"
              >
                {item.title}
              </Text>
            </Button>
          ))}
        </TabList>

        <TabPanels>
          {selectTabId === 0 ? (
            <TabPanel>
              <Container mt="40px" display="flex">
                <Flex
                  w="260px"
                  h="492px"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  background="#F9F9F9"
                  borderRadius="4px"
                  p="20px"
                  border="1px solid #F9F9F9"
                  mr="16px"
                >
                  <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="2px">
                    <Box as="img" src={IconAllState.default} alt="" w="22px" h="22px" mr="8px" />
                    <Text>{t('Browing.Status')}</Text>
                  </Flex>

                  <Flex width="100%" flexFlow="wrap" justifyContent="space-between">
                    <StatusSelector statusArr={statusArr} selectedArr={selectedStatusArr} handleSelect={handleSelectStatus} />
                  </Flex>
                  <Flex h="21px" width="100%" flexDirection="row" alignItems="center" m="22px 0 12px 0">
                    <Box as="img" src={IconAllStateone.default} alt="" w="22px" h="22px" mr="8px" />
                    <Text>{t('Browing.Collections')}</Text>
                  </Flex>
                  <InputGroup
                    variant="unstyled"
                    width="220px"
                    height="40px"
                    background="#FFFFFF"
                    borderRadius="4px"
                    border="1px solid #E5E5E5"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p="0px 0 0px 12px"
                    m="12px 0 20px 0px"
                  >
                    <Image w="16px" h="16px" mr="6px" src={IconSearch.default} alt="" />
                    <Input
                      fontSize="14px"
                      fontFamily="TTHoves-Regular, TTHoves"
                      fontWeight="400"
                      color="#999999"
                      placeholder={t('Browing.collectionPlaceholder')}
                    />
                  </InputGroup>

                  <CollectionSelector
                    collectionArr={collectionsData!.list}
                    selectedArr={selectedCollectionArr}
                    handleSelect={handleSelectCollection}
                  />
                </Flex>

                <Flex width="1088px" flexDirection="column" justifyContent="flex-start">

                  <Flex h="36px">
                    <CategorySelector
                      list={categoriesData!.list}
                      selectId={selectedCategoryId}
                      handleSelect={handleSelectCategory}
                    />
                  </Flex>
                  <Flex
                    m="29px 0 20px 0"
                    width="1088px"
                    h="36px"
                    flexFlow="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Text
                      fontSize="14px"
                      fontFamily="TTHoves-Regular, TTHoves"
                      fontWeight="400"
                      color="#999999"
                    >
                      1,291 results
                    </Text>
                    <SortBy />
                  </Flex>
                  <Flex width="1088px" flexFlow="row wrap" justifyContent="space-between">
                    {nftsData?.orders.map((nft) => <Flex mb="16px"><NftCard nft={nft} /></Flex>)}
                  </Flex>
                </Flex>
              </Container>
            </TabPanel>
          ) : ''}

          {selectTabId === 1 ? (
            <TabPanel>
              <Container mt="40px" display="flex">
                <Flex
                  w="260px"
                  h="492px"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="center"
                  background="#F9F9F9"
                  borderRadius="4px"
                  p="20px"
                  border="1px solid #F9F9F9"
                  mr="16px"
                >
                  <Flex h="21px" width="100%" flexDirection="row" alignItems="center" mb="2px">
                    <Box as="img" src={IconAllState.default} alt="" w="22px" h="22px" mr="8px" />
                    <Text>{t('Browing.Status')}</Text>
                  </Flex>

                  <Flex width="100%" flexFlow="wrap" justifyContent="space-between">
                    <StatusSelector statusArr={statusArr} selectedArr={selectedStatusArr} handleSelect={handleSelectStatus} />
                  </Flex>
                  <Flex h="21px" width="100%" flexDirection="row" alignItems="center" m="22px 0 12px 0">
                    <Box as="img" src={IconAllStateone.default} alt="" w="22px" h="22px" mr="8px" />
                    <Text>{t('Browing.Collections')}</Text>
                  </Flex>
                  <InputGroup
                    variant="unstyled"
                    width="220px"
                    height="40px"
                    background="#FFFFFF"
                    borderRadius="4px"
                    border="1px solid #E5E5E5"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    p="0px 0 0px 12px"
                    m="12px 0 20px 0px"
                  >
                    <Image w="16px" h="16px" mr="6px" src={IconSearch.default} alt="" />
                    <Input
                      fontSize="14px"
                      fontFamily="TTHoves-Regular, TTHoves"
                      fontWeight="400"
                      color="#999999"
                      placeholder={t('Browing.collectionPlaceholder')}
                    />
                  </InputGroup>

                  <CollectionSelector
                    collectionArr={collectionsData!.list}
                    selectedArr={selectedCollectionArr}
                    handleSelect={handleSelectCollection}
                  />
                </Flex>

                <Flex width="1088px" flexDirection="column" justifyContent="flex-start">

                  <Flex h="40px">
                    {offersMadeButton.map((item, index) => (
                      <Button
                        mr="10px"
                        key={item.id}
                        id={item.id}
                        minWidth="123px"
                        height="40px"
                        borderRadius="4px 4px 0px 0px"
                        border="1px solid #000000"
                        onClick={handleButtonSelect}
                        backgroundColor={offersMadeButtonId === index ? '#000000' : '#FFFFFF'}
                      >
                        <Text
                          fontSize="14px"
                          fontFamily="TTHoves-Medium, TTHoves"
                          fontWeight="500"
                          color={offersMadeButtonId === index ? '#FFFFFF' : '#000000'}
                          lineHeight="16px"
                        >
                          {item.title}
                        </Text>
                      </Button>
                    ))}
                  </Flex>
                  <Flex width="1088px" flexDirection="column" textAlign="center">
                    <Flex
                      p="0 20px"
                      width="100%"
                      height="40px"
                      flexFlow="row"
                      justifyContent="space-between"
                      alignItems="center"
                      flexDirection="row"
                      borderBottom="1px solid #E5E5E5"
                    >
                      <Text
                        width="224px"
                        textAlign="left"
                        fontSize="12px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="20px"
                      >
                        Item
                      </Text>
                      <Text
                        width="80px"
                        fontSize="12px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="20px"
                      >
                        UnitPrice
                      </Text>
                      <Text
                        width="60px"
                        fontSize="12px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="20px"
                      >
                        Quantity
                      </Text>
                      <Text
                        width="60px"
                        fontSize="12px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="20px"
                      >
                        From
                      </Text>
                      <Text
                        width="120px"
                        textAlign="right"
                        fontSize="12px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="20px"
                      >
                        Expiration
                      </Text>
                    </Flex>
                    {offersMadeArr.map((item, index) => (
                      <Flex
                        key={item}
                        p="0 20px"
                        width="100%"
                        height="81px"
                        flexFlow="row"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom="1px solid #E5E5E5"
                      >
                        <Flex
                          flexDirection="row"
                          justifyContent="flex-start"
                          width="224px"
                          textAlign="left"
                          fontSize="12px"
                          fontFamily="TTHoves-Regular, TTHoves"
                          fontWeight="400"
                          color="#000000"
                          lineHeight="20px"
                        >
                          <Image
                            mr="10px"
                            width="54px"
                            height="40px"
                            borderRadius="4px"
                            src={AccountBanner.default}
                            alt=""
                          />
                          <Flex
                            flexDirection="column"
                            textAlign="left"
                            fontSize="12px"
                            fontFamily="TTHoves-Regular, TTHoves"
                            fontWeight="400"
                            color="#999999"
                            lineHeight="14px"
                          >
                            <Text
                              mb="5px"
                              width="60px"
                              fontSize="14px"
                              fontFamily="TTHoves-Regular, TTHoves"
                              fontWeight="400"
                              color="#000000"
                              lineHeight="20px"
                            >
                              BeSide
                            </Text>
                            <Text>
                              Parity Asia hackathon
                            </Text>
                          </Flex>
                        </Flex>
                        <Text
                          display="flex"
                          flexDirection="row"
                          justifyContent="center"
                          fontSize="12px"
                          fontFamily="TTHoves-Regular, TTHoves"
                          fontWeight="400"
                          color="#000000"
                          lineHeight="20px"
                        >
                          29084
                          <Text
                            ml="3px"
                            fontSize="14px"
                            fontFamily="TTHoves-Regular, TTHoves"
                            fontWeight="400"
                            color="#999999"
                            lineHeight="20px"
                          >
                            NMT
                          </Text>
                        </Text>
                        <Text
                          width="60px"
                          fontSize="14px"
                          fontFamily="TTHoves-Regular, TTHoves"
                          fontWeight="400"
                          color="#000000"
                          lineHeight="20px"
                        >
                          6
                        </Text>
                        <Text
                          width="60px"
                          fontSize="14px"
                          fontFamily="TTHoves-Regular, TTHoves"
                          fontWeight="400"
                          color="#000000"
                          lineHeight="20px"
                        >
                          4tf...fp
                        </Text>
                        <Text
                          width="120px"
                          textAlign="right"
                          fontSize="14px"
                          fontFamily="TTHoves-Regular, TTHoves"
                          fontWeight="400"
                          color="#000000"
                          lineHeight="20px"
                          textStroke="1px #979797"
                        >
                          in 2 hours
                        </Text>
                      </Flex>
                    ))}
                  </Flex>
                </Flex>
              </Container>
            </TabPanel>
          ) : ''}
          {selectTabId === 2 ? (
            <Container mt="40px">
              <SimpleGrid
                columns={5}
                spacing={4}
              >
                <Flex
                  width="260px"
                  height="249px"
                  borderRadius="4px"
                  border="1px solid #000000"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Image
                    border="1px solid #000000"
                    borderStyle="dashed"
                    w="100px"
                    h="100px"
                    src={ImgAdd.default}
                    alt=""
                  />
                  <Text
                    textAlign="center"
                    w="100%"
                    lineHeight="px"
                    fontSize="14px"
                    fontFamily="TTHoves-Regular, TTHoves"
                    fontWeight="400"
                    color="#999999"
                  >
                    Create a new collection
                  </Text>
                  <Button
                    mt="24px"
                    width="109px"
                    height="40px"
                    background="#000000"
                    borderRadius="4px"
                  >
                    <Text
                      fontSize="14px"
                      fontFamily="TTHoves-Medium, TTHoves"
                      fontWeight="500"
                      lineHeight="16px"
                      color="#FFFFFF"
                    >
                      create
                    </Text>
                  </Button>

                </Flex>
                {collectionsArr.map((item) => (

                  <Flex
                    key={item}
                    width="260px"
                    height="249px"
                    borderRadius="4px"
                    border="1px solid #000000"
                    flexDirection="column"
                  >
                    <Image w="100%" h="195px" src={AccountBanner.default} alt="" />
                    <Text
                      w="100%"
                      background="#000000"
                      pl="16px"
                      lineHeight="54px"
                      fontSize="16px"
                      fontFamily="TTHoves-Regular, TTHoves"
                      fontWeight="400"
                      color="#FFFFFF"
                    >
                      in 2 hours
                    </Text>
                  </Flex>
                ))}
              </SimpleGrid>
            </Container>
          ) : ''}
        </TabPanels>
      </Tabs>
    </MainContainer>
  );
};

export default Account;
