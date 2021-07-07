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
  Image,
  Text,
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
import MainContainer from '../../layout/MainContainer';

import {
  IconDetailsocllections,
  IconDetailsRefresh,
  IconDetailshaSre,
  IconDetailsCollection,
  Emptyimg,
  IconLeft,
} from '../../assets/images';
import { mintNft } from '../../polkaSDK/api/mintNft';

const CreateNft: FC = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const history = useHistory();
  const chainState = useAppSelector((state) => state.chain);

  const { account } = chainState;

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
    onSubmit: (formValue, formAction) => {
      mint(formValue, {
        success: () => {
          toast({
            title: t('create.detailtoast.success'),
            status: 'success',
            position: 'top',
            duration: 3000,
          });
          formAction.setSubmitting(false);
          formAction.resetForm();

          const OneClasses = classes?.find((cls) => +cls.classId === +formValue.classId);
          if (OneClasses) {
            const { totalIssuance } = OneClasses;
            setTimeout(() => {
              history.push(`/detail/${formValue.classId}/${totalIssuance}`);
            }, 2000);
          }
        },
        error: (error: string) => {
          toast({
            title: 'error',
            status: 'error',
            position: 'top',
            duration: 3000,
            description: error,
          });
          formAction.setSubmitting(false);
        },
      });
    },
    validationSchema: schema,
  });
  const params = useParams();
  const collectionId = params.get('collectionId') || '';

  const mint = useCallback(async (formValue: any, cb) => {
    const { classId, ...others } = formValue;
    const normalizedFormData = {
      address: account?.address,
      metadata: { ...others },
      classId: Number(collectionId),
      cb,
    };
    mintNft(normalizedFormData);
  }, []);
  return (
    <MainContainer title={t('Collection.title')}>
      <Flex
        w="100%"
        h="80px"
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
          </Flex>
        </Flex>

      </Flex>
      <Flex
        w="600px"
        flexDirection="column"
        position="relative"
        top="-54px"
      >
        <Text
          mb="21px"
          w="100%"
          textAlign="center"
          fontSize="22px"
          fontFamily="TTHoves-Bold, TTHoves"
          fontWeight="bold"
          color="#191A24"
          lineHeight="27px"
        >
          General Settings
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="logoUrl">
            {' '}
            <EditFormTitle text="*Logo image" />
            <EditFromSubTitle text="This image will also be used for navigation. 300 x 300 recommended." />
          </label>
          <Upload
            id="logoUrl"
            mediatype="nocutting"
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
    </MainContainer>
  );
};

export default CreateNft;
