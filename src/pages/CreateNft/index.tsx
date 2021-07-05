import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {
  useFormik,
} from 'formik';

import {
  useToast,
  Flex,
} from '@chakra-ui/react';
import useParams from '../../hooks/url/useParams';
import Upload from '../../components/Upload';
import EditFormTitle from '../../components/EditFormTitle';
import EditFromSubTitle from '../../components/EditFromSubTitle';
import SubmitButton from '../../components/SubmitButton';
import FormInput from '../../components/FormInput';
import FromTextarea from '../../components/FromTextarea';
import LeftAddonInput from '../../components/LeftAddonInput';
import { useAppSelector } from '../../hooks/redux';
import LoginDetector from '../../components/LoginDetector';

const CreateNft: FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const history = useHistory();
  const chainState = useAppSelector((state) => state.chain);

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
      .max(50, t('createVerificationCollectionName'))
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
          <EditFormTitle text="*Logo image" />
          <EditFromSubTitle text="This image will also be used for navigation. 300 x 300 recommended." />
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
          <EditFormTitle text="Featured image" />
          <EditFromSubTitle text="This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of NFTMart. 600 x 400 recommended." />
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
          <EditFormTitle text="*Name" />
          <EditFromSubTitle text="Only letters, numbers, and hyphens are supported,50 characters or less." />
        </label>
        <FormInput id="name" value={formik.values.name} onChange={formik.handleChange} />
        {formik.errors.name && formik.touched.name ? (
          <div style={{ color: 'red' }}>{formik.errors.name}</div>
        ) : null}
        <label htmlFor="nftMartUrl">
          {' '}
          <EditFormTitle text="*URL" />
          <EditFromSubTitle text="Customize your URL on NFTMart. Must only contain lowercase letters, numbers, and hyphens, 50 characterscters or less." />
        </label>
        <LeftAddonInput id="nftMartUrl" value={formik.values.nftMartUrl} onChange={formik.handleChange} />
        <label htmlFor="description">
          {' '}
          <EditFormTitle text="Description" />
          <EditFromSubTitle text="Markdown syntax is supported. 1000 characterscters or less." />
        </label>
        <FromTextarea id="description" onChange={formik.handleChange} value={formik.values.description} />
        <Flex
          w="600px"
          justifyContent="center"
        >
          <SubmitButton text="Submit" />
        </Flex>
      </form>
      <LoginDetector />
    </Flex>
  );
};

export default CreateNft;
