/* eslint-disable max-len */
/* eslint-disable react/no-children-prop */
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {
  useFormik,
} from 'formik';

import {
  useToast,
  Text,
  Flex,
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
} from '@chakra-ui/react';
import useParams from '../../hooks/url/useParams';
import Upload from '../../components/Upload';

const CreateNft: FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const history = useHistory();

  const schema = Yup.object().shape({
    logoUrl: Yup.string().matches(
      /(http|https):\/\/([\w.]+\/?)\S*/,
      t('createVerificationExternalUrl'),
    ),
    featuredUrl: Yup.string().matches(
      /(http|https):\/\/([\w.]+\/?)\S*/,
      t('createVerificationExternalUrl'),
    ),
    name: Yup.string()
      .max(20, t('createVerificationCollectionName'))
      .required(t('createVerificationRequired')),
    nftMartUrl: Yup.string().max(200).required(t('createVerificationRequired')),
    description: Yup.string()
      .max(200, t('createVerificationDescription'))
      .required(t('createVerificationRequired')),
  });

  const formik = useFormik({
    initialValues: {
      logoUrl: '',
      featuredUrl: '',
      name: '',
      nftMartUrl: '',
      description: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
    validationSchema: schema,
  });
  const params = useParams();
  const collectionId = params.get('collectionId') || '';

  return (
    <Flex
      marginTop="120px"
      w="600px"
      minHeight="100vh"
    >
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="logoUrl">
          {' '}
          <Text
            mt="30px"
            lineHeight="23px"
            fontSize="20px"
            fontFamily="TTHoves-Medium, TTHoves"
            fontWeight="500"
            color="#000000"
          >
            *Logo image
          </Text>
          <Text
            m="9px 0 24px 0"
            lineHeight="16px"
            fontSize="14px"
            fontFamily="TTHoves-Regular, TTHoves"
            fontWeight="400"
            color="#999999"
          >
            This image will also be used for navigation. 300 x 300 recommended.
          </Text>
        </label>
        <Upload
          id="logoUrl"
          mediatype="nocuttiing"
          rectangle=""
          value={formik.values.logoUrl}
          onChange={(v: any) => {
            formik.setFieldValue('url', v);
          }}
        />
        <label htmlFor="featuredUrl">
          {' '}
          <Text
            mt="30px"
            lineHeight="23px"
            fontSize="20px"
            fontFamily="TTHoves-Medium, TTHoves"
            fontWeight="500"
            color="#000000"
          >
            Featured image
          </Text>
          <Text
            m="9px 0 24px 0"
            lineHeight="16px"
            fontSize="14px"
            fontFamily="TTHoves-Regular, TTHoves"
            fontWeight="400"
            color="#999999"
          >
            This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of NFTMart. 600 x 400 recommended.
          </Text>
        </label>
        <Upload
          id="featuredUrl"
          mediatype="nocuttiing"
          rectangle="rectangle"
          value={formik.values.featuredUrl}
          onChange={(v: any) => {
            formik.setFieldValue('featuredUrl', v);
          }}
        />
        <label htmlFor="name">
          {' '}
          *Name
          Only letters, numbers, and hyphens are supported,50 characters or less.
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {formik.errors.name && formik.touched.name ? (
          <div style={{ color: 'red' }}>{formik.errors.name}</div>
        ) : null}
        <label htmlFor="name">
          {' '}
          <Text
            mt="30px"
            lineHeight="23px"
            fontSize="20px"
            fontFamily="TTHoves-Medium, TTHoves"
            fontWeight="500"
            color="#000000"
          >
            *Name
          </Text>
          <Text
            lineHeight="16px"
            fontSize="14px"
            fontFamily="TTHoves-Regular, TTHoves"
            fontWeight="400"
            color="#999999"
            m="9px 0 24px 0"
          >
            Only letters, numbers, and hyphens are supported,50 characters or less.
          </Text>
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          height="40px"
          background="#FFFFFF"
          borderRadius="4px"
          border="1px solid #E5E5E5"
          fontSize="12px"
          fontFamily="TTHoves-Regular, TTHoves"
          fontWeight="400"
          color="#999999"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Username"
        />
        {formik.errors.name && formik.touched.name ? (
          <div style={{ color: 'red' }}>{formik.errors.name}</div>
        ) : null}
        <label htmlFor="nftMartUrl">
          {' '}
          <Text
            mt="30px"
            lineHeight="23px"
            fontSize="20px"
            fontFamily="TTHoves-Medium, TTHoves"
            fontWeight="500"
            color="#000000"
          >
            *URL
          </Text>
          <Text
            m="9px 0 24px 0"
            lineHeight="16px"
            fontSize="14px"
            fontFamily="TTHoves-Regular, TTHoves"
            fontWeight="400"
            color="#999999"
          >
            Customize your URL on NFTMart. Must only contain lowercase letters, numbers, and hyphens, 50 characterscters or less.
          </Text>
        </label>

        <InputGroup
          width="600px"
          height="40px"
          background="#FFFFFF"
          borderRadius="4px"
          border="1px solid #E5E5E5"
          fontSize="12px"
          fontFamily="TTHoves-Regular, TTHoves"
          fontWeight="400"
          color="#999999"
        >
          <InputLeftAddon
            width="203px"
            height="40px"
            background="#F4F4F4"
            borderRadius="0px 4px 4px 0px"
            border="1px solid #E5E5E5"
            fontSize="12px"
            fontFamily="TTHoves-Regular, TTHoves"
            fontWeight="400"
            children="https://nftmart.io/collection/"
          />
          <Input
            fontSize="12px"
            fontFamily="TTHoves-Regular, TTHoves"
            fontWeight="400"
            placeholder=""
          />
        </InputGroup>

        <label htmlFor="description">
          {' '}
          <Text
            mt="30px"
            lineHeight="23px"
            fontSize="20px"
            fontFamily="TTHoves-Medium, TTHoves"
            fontWeight="500"
            color="#000000"
          >
            Description
          </Text>
          <Text
            m="9px 0 24px 0"
            lineHeight="16px"
            fontSize="14px"
            fontFamily="TTHoves-Regular, TTHoves"
            fontWeight="400"
            color="#999999"
          >
            Markdown syntax is supported. 1000 characterscters or less.
          </Text>

        </label>
        <Textarea
          display="flex"
          alignItems="flex-start"
          width="600px"
          height="120px"
          background="#FFFFFF"
          borderRadius="4px"
          border="1px solid #E5E5E5"
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <Flex
          w="600px"
          justifyContent="center"
        >
          <Button
            mt="30px"
            w="96px"
            height="40px"
            background="#000000"
            borderRadius="4px"
            fontSize="14px"
            fontFamily="TTHoves-Medium, TTHoves"
            fontWeight="500"
            color="#FFFFFF"
            type="submit"
          >
            Submit
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};

export default CreateNft;
