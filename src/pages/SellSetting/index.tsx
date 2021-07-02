/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-children-prop */
/* eslint-disable max-len */
import React, { useState, MouseEventHandler } from 'react';
import {
  Spinner,
  Flex,
  Container,
  Box,
  Text,
  Image,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  InputGroup,
  InputLeftAddon,
  Input,
  InputRightAddon,
  Switch,
  Progress,
} from '@chakra-ui/react';
import { union, without } from 'lodash';

import { useTranslation } from 'react-i18next';
import MainContainer from '../../layout/MainContainer';
import colors from '../../themes/colors';

import {
  IconDetailsocllections,
  IconDetailsRefresh,
  IconDetailshaSre,
  IconDetailsCollection,
  Emptyimg,
  IconLeft,
} from '../../assets/images';

const ButtonArr = [
  {
    id: 0, title: 'Set Price', subtitle: 'Sell at a fiexd price', isDisabled: false,
  },
  {
    id: 1, title: 'Dutch auction', subtitle: 'Sell at a declining price', isDisabled: true,
  },
  {
    id: 2, title: 'English Auction', subtitle: 'Auction to the highest bidder', isDisabled: true,
  },
];

const Detail = () => {
  const { t } = useTranslation();
  const [selectId, setSelectId] = useState(0);

  const handleSelect: MouseEventHandler<HTMLButtonElement> = (event) => {
    setSelectId(Number(event.currentTarget.id));
  };
  console.log(selectId);

  return (
    <MainContainer title={t('Detail.title')}>
      <Flex
        w="100vw"
        h="80px"
        background="#F9F9F9"
        flexDirection="row"
        justifyContent="center"
        alignItems="center"
      >
        <Flex
          w="1360px"
          height="40px"
          flexDirection="row"
          justifyContent="felx-start"
          alignItems="center"
        >
          <Image
            mr="20px"
            w="12px"
            h="12px"
            src={IconLeft.default}
          />
          <Image
            m="0 20px 0 10px"
            w="auto"
            h="40px"
            src={Emptyimg.default}
          />
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Text
              fontSize="12px"
              fontFamily="TTHoves-Regular, TTHoves"
              fontWeight="400"
              color="#999999"
              lineHeight="14px"
            >
              BeSide
            </Text>
            <Text
              mt="5px"
              fontSize="14px"
              fontFamily="TTHoves-Medium, TTHoves"
              fontWeight="500"
              color="#191A24"
              lineHeight="16px"
            >
              Parity Asia hackathon
            </Text>
          </Flex>
        </Flex>

      </Flex>
      <Container
        display="flex"
        flexDirection="column"
        width="100%"
        justifyContent="flex-start"
        alignItems="flex-start"
      >

        <Text
          p="40px 0px 20px 0px"
          textAlign="left"
          w="100%"
          fontSize="18px"
          fontFamily="TTHoves-Medium, TTHoves"
          fontWeight="500"
          color="#000000"
          lineHeight="22px"
        >
          Select your sell method
        </Text>
        <Flex
          width="100%"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Flex
            className="sellLeft"
            w="790px"
            flexDirection="column"
          >
            <Flex
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              {ButtonArr.map((item, index) => (
                <Button
                  key={item.title}
                  width="254px"
                  height="80px"
                  borderRadius="4px"
                  border="1px solid #000000"
                  display="flex"
                  flexDirection="column"
                  onClick={handleSelect}
                  isDisabled={item.isDisabled}
                  variant="outline"
                  backgroundColor={selectId === index ? '#000000' : ''}
                  _hover={selectId === index ? {
                    background: '#000000',
                  } : {
                    background: '#FFFFFF',
                  }}
                >
                  <Text
                    display="block"
                    fontSize="16px"
                    fontFamily="TTHoves-Medium, TTHoves"
                    fontWeight="500"
                    color={selectId === index ? '#FFFFFF' : '#000000'}
                    lineHeight="18px"
                  >
                    {item.title}
                  </Text>
                  <Text
                    display="block"
                    mt="8px"
                    fontSize="14px"
                    fontFamily="TTHoves-Regular, TTHoves"
                    fontWeight="400"
                    color={selectId === index ? '#FFFFFF' : '#999999'}
                    lineHeight="14px"
                  >
                    {item.subtitle}
                  </Text>
                </Button>
              ))}
            </Flex>
            <Flex
              w="100%"
              h="80px"
              mt="20px"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Text
                  fontSize="16px"
                  fontFamily="TTHoves-Medium, TTHoves"
                  fontWeight="500"
                  color="#000000"
                  lineHeight="18px"
                >
                  Set Price
                </Text>
                <Text
                  mt="8px"
                  fontSize="12px"
                  fontFamily="TTHoves-Regular, TTHoves"
                  fontWeight="400"
                  color="#858999"
                  lineHeight="14px"
                >
                  Will be on sale until you transfer this item or cancel it.
                </Text>
              </Flex>
              <InputGroup
                width="200px"
                height="40px"
                background="#FFFFFF"
                borderRadius="4px"
                border="1px solid #E5E5E5"
              >
                <Input
                  fontSize="12px"
                  fontFamily="TTHoves-Regular, TTHoves"
                  fontWeight="400"
                  color="#999999"
                  lineHeight="14px"
                  _focus={{
                    boxShadow: 'none',
                  }}
                  placeholder="Price"
                />
                <InputRightAddon
                  width="72px"
                  height="40px"
                  background="#F4F4F4"
                  borderRadius="0px 4px 4px 0px"
                  border="1px solid #E5E5E5"
                  fontSize="14px"
                  fontFamily="TTHoves-Regular, TTHoves"
                  fontWeight="400"
                  color="#999999"
                  lineHeight="14px"
                  children="NMT"
                />
              </InputGroup>
            </Flex>
            <Flex
              w="100%"
              h="80px"
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="flex-start"
              >
                <Text
                  fontSize="16px"
                  fontFamily="TTHoves-Medium, TTHoves"
                  fontWeight="500"
                  color="#000000"
                  lineHeight="18px"
                >
                  Pledge
                </Text>
                <Text
                  mt="8px"
                  fontSize="12px"
                  fontFamily="TTHoves-Regular, TTHoves"
                  fontWeight="400"
                  color="#858999"
                  lineHeight="14px"
                >
                  When it's cancled or sold, the collateral goes back to you.
                </Text>
              </Flex>
              <InputGroup
                width="200px"
                height="40px"
                background="#FFFFFF"
                borderRadius="4px"
                border="1px solid #E5E5E5"
              >
                <Input
                  fontSize="12px"
                  fontFamily="TTHoves-Regular, TTHoves"
                  fontWeight="400"
                  color="#999999"
                  lineHeight="14px"
                  _focus={{
                    boxShadow: 'none',
                  }}
                  placeholder="Price"
                />
                <InputRightAddon
                  width="72px"
                  height="40px"
                  background="#F4F4F4"
                  borderRadius="0px 4px 4px 0px"
                  border="1px solid #E5E5E5"
                  fontSize="14px"
                  fontFamily="TTHoves-Regular, TTHoves"
                  fontWeight="400"
                  color="#999999"
                  lineHeight="14px"
                  children="NMT"
                />
              </InputGroup>

            </Flex>
            <Accordion width="100%" defaultIndex={[0, 1, 2]} allowMultiple>
              <AccordionItem width="100%" border="none">
                <AccordionButton
                  height="62px"
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p="0"
                  borderBottom="1px solid #E5E5E5"
                  outline="none"
                  _focus={{
                    textDecoration: 'none',
                    boxShadow: 'none',
                  }}
                >
                  <Flex height="100%" alignItems="center">
                    <Image
                      mr="8px"
                      w="22px"
                      h="22px"
                      src={IconDetailsCollection.default}
                    />
                    <Text
                      fontSize="16px"
                      fontFamily="TTHoves-Medium, TTHoves"
                      fontWeight="500"
                      color="#000000"
                      lineHeight="18px"
                    >
                      Intructions
                    </Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel p="20px 0">
                  <Text
                    w="100%"
                    textAlign="left"
                    fontSize="13.9px"
                    fontFamily="TTHoves-Light, TTHoves"
                    fontWeight="300"
                    color="#000000"
                    lineHeight="22px"
                  >
                    NFTmart is a fully decentralized NFT exchange, all your operations will be on the blockchain, and anyone can buy your NFT through the blockchain, not just through the NFTmart.io website. However, because NFTMart is based on the NFTMart Chain, the commission fee is very low.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
          <Flex width="560px">
            <Accordion width="100%" defaultIndex={[0, 1, 2]} allowMultiple>
              <AccordionItem width="100%" border="none">
                <AccordionButton
                  background="#F9F9F9"
                  p="0 20px"
                  height="62px"
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  borderBottom="1px solid #E5E5E5"
                  outline="none"
                  _focus={{
                    textDecoration: 'none',
                    boxShadow: 'none',
                  }}
                >
                  <Flex height="100%" alignItems="center">
                    <Image
                      mr="8px"
                      w="22px"
                      h="22px"
                      src={IconDetailsCollection.default}
                    />
                    <Text
                      fontSize="16px"
                      fontFamily="TTHoves-Medium, TTHoves"
                      fontWeight="500"
                      color="#000000"
                      lineHeight="18px"
                    >
                      Summary
                    </Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel background="#F9F9F9" p="0 20px">
                  <Flex
                    p="17px 0 20px 0"
                    flexDirection="column"
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    borderBottom="1px solid #E5E5E5"
                  >
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="16px"
                        fontFamily="TTHoves-Medium, TTHoves"
                        fontWeight="500"
                        color="#232A4A"
                        lineHeight="18px"
                      >
                        Listing
                      </Text>
                      <Text
                        mt="12px"
                        fontSize="14px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="16px"
                      >
                        Your item will be listed for 21,023 NEM. After the deal, youwill get 20,182.08 NEM
                      </Text>
                    </Flex>
                    <Button
                      mt="40px"
                      width="182px"
                      height="40px"
                      background="#000000"
                      borderRadius="4px"
                      fontSize="14px"
                      fontFamily="TTHoves-Medium, TTHoves"
                      fontWeight="500"
                      color="#FFFFFF"
                      lineHeight="16px"
                    >
                      Post Your Listing
                    </Button>
                  </Flex>
                  <Flex
                    p="20px 0 20px 0"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    borderBottom="1px solid #E5E5E5"
                  >
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="16px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="18px"
                      >
                        Bounties
                      </Text>
                      <Text
                        width="200px"
                        mt="8px"
                        fontSize="12px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#999999"
                        lineHeight="14px"
                      >
                        Reward the person who introduces the buyer.
                      </Text>
                    </Flex>
                    <Flex
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="flex-end"
                    >
                      <Switch colorScheme="teal" size="lg" />
                      <InputGroup
                        mt="10px"
                        width="200px"
                        height="40px"
                        background="#FFFFFF"
                        borderRadius="4px"
                        border="1px solid #E5E5E5"
                      >
                        <Input
                          fontSize="12px"
                          fontFamily="TTHoves-Regular, TTHoves"
                          fontWeight="400"
                          color="#999999"
                          lineHeight="14px"
                          _focus={{
                            boxShadow: 'none',
                          }}
                          placeholder="0"
                        />
                        <InputRightAddon
                          width="54px"
                          height="40px"
                          background="#F4F4F4"
                          borderRadius="0px 4px 4px 0px"
                          border="1px solid #E5E5E5"
                          fontSize="14px"
                          fontFamily="TTHoves-Regular, TTHoves"
                          fontWeight="400"
                          color="#999999"
                          lineHeight="14px"
                          children="%"
                        />
                      </InputGroup>
                    </Flex>

                  </Flex>
                  <Flex
                    p="20px 0 20px 0"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    borderBottom="1px solid #E5E5E5"
                  >
                    <Flex
                      w="100%"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="16px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="18px"
                      >
                        Royalties
                      </Text>
                      <Text
                        mt="8px"
                        fontSize="12px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#999999"
                        lineHeight="14px"
                      >
                        NFTMart will charge royalties to the creator based on the following formula.
                      </Text>
                    </Flex>
                    <Flex
                      m="23px 0 4px 0"
                      width="100%"
                      h="16px"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        fontSize="14px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="16px"
                      >
                        To Creater
                      </Text>
                      <Progress width="378px" height="3px" borderRadius="2px" value={20} colorScheme={colors.black} />
                      <Text
                        fontSize="14px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="16px"
                      >
                        4%
                      </Text>
                    </Flex>

                  </Flex>
                  <Flex
                    p="20px 0 20px 0"
                    flexDirection="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                  >
                    <Flex
                      w="100%"
                      flexDirection="column"
                      justifyContent="center"
                      alignItems="flex-start"
                    >
                      <Text
                        fontSize="16px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="18px"
                      >
                        Tax
                      </Text>
                      <Text
                        mt="8px"
                        fontSize="12px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#999999"
                        lineHeight="14px"
                      >
                        Listing is free! At the time of sale, a transaction tax will be levied.
                      </Text>
                    </Flex>
                    <Flex
                      m="23px 0 4px 0"
                      width="100%"
                      h="16px"
                      flexDirection="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Text
                        fontSize="14px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="16px"
                      >
                        To NFTMart
                      </Text>
                      <Progress width="378px" height="3px" borderRadius="2px" value={20} colorScheme={colors.black} />
                      <Text
                        fontSize="14px"
                        fontFamily="TTHoves-Regular, TTHoves"
                        fontWeight="400"
                        color="#000000"
                        lineHeight="16px"
                      >
                        4%
                      </Text>
                    </Flex>
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Flex>
        </Flex>

      </Container>
    </MainContainer>

  );
};

export default Detail;
