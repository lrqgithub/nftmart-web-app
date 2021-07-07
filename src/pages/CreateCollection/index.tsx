/* eslint-disable react/no-children-prop */
import React, { FC, useCallback } from 'react';
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
import FormInput from '../../components/FormInput';
import LeftAddonInput from '../../components/LeftAddonInput';
import FromTextarea from '../../components/FromTextarea';
import SubmitButton from '../../components/SubmitButton';
import LoginDetector from '../../components/LoginDetector';
import { createClass } from '../../polkaSDK/api/createClass';
import { useAppSelector } from '../../hooks/redux';

const CreateCollection: FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const history = useHistory();
  const chainState = useAppSelector((state) => state.chain);
  const { account } = chainState;

  const create = useCallback((formValue, cb) => {
    createClass({ address: account!.address, metadata: formValue, cb });
  }, []);

  const schema = Yup.object().shape({
    logoUrl: Yup.string().required(t('createVerificationRequired')),
    featuredUrl: Yup.string().matches(
      /(http|https):\/\/([\w.]+\/?)\S*/,
      t('createVerificationExternalUrl'),
    ),
    name: Yup.string()
      .max(50, t('createVerificationCollectionName'))
      .required(t('createVerificationRequired')),
    nftMartUrl: Yup.string().max(200),
    description: Yup.string()
      .max(200, t('createVerificationDescription')),
  });

  const formik = useFormik({
    initialValues: {
      logoUrl: '',
      featuredUrl: '',
      name: '',
      nftMartUrl: '',
      description: '',
    },
    onSubmit: (values, formActions) => {
      console.log(values);
      create(values, {
        success: (err: any) => {
          if (err.dispatchError) {
            toast({
              title: 'error',
              status: 'error',
              position: 'top',
              duration: 3000,
              description: t('create.create.error'),
            });
          } else {
            toast({
              title: 'success',
              status: 'success',
              position: 'top',
              duration: 3000,
            });
          }
          formActions.setSubmitting(false);
          formActions.resetForm();
        },
        error: (err: any) => {
          toast({
            title: 'error',
            status: 'error',
            position: 'top',
            duration: 3000,
            description: err,
          });
          formActions.setSubmitting(false);
        },
      });
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
          mediatype="cutting"
          rectangle=""
          value={formik.values.logoUrl}
          onChange={(v: any) => {
            console.log(v, 'onChange');
            formik.setFieldValue('logoUrl', v);
          }}
        />
        {formik.errors.logoUrl && formik.touched.logoUrl ? (
          <div style={{ color: 'red' }}>{formik.errors.logoUrl}</div>
        ) : null}
        <label htmlFor="featuredUrl">
          {' '}
          <EditFormTitle text="Featured image" />
          <EditFromSubTitle text="This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of NFTMart. 600 x 400 recommended." />
        </label>
        {formik.errors.featuredUrl && formik.touched.featuredUrl ? (
          <div style={{ color: 'red' }}>{formik.errors.featuredUrl}</div>
        ) : null}
        <Upload
          id="featuredUrl"
          mediatype="cutting"
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
          <EditFormTitle text="URL" />
          <EditFromSubTitle
            text="Customize your URL on NFTMart. Must only contain lowercase letters, numbers, and hyphens, 50 characterscters or less."
          />
        </label>
        <LeftAddonInput id="nftMartUrl" value={formik.values.nftMartUrl} onChange={formik.handleChange} />
        {formik.errors.nftMartUrl && formik.touched.nftMartUrl ? (
          <div style={{ color: 'red' }}>{formik.errors.nftMartUrl}</div>
        ) : null}
        <label htmlFor="description">
          {' '}
          <EditFormTitle text="Description" />
          <EditFromSubTitle text="Markdown syntax is supported. 1000 characterscters or less." />
        </label>
        <FromTextarea id="description" onChange={formik.handleChange} value={formik.values.description} />
        {formik.errors.description && formik.touched.description ? (
          <div style={{ color: 'red' }}>{formik.errors.description}</div>
        ) : null}
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

export default CreateCollection;
