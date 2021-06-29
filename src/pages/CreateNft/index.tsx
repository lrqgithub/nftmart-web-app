import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import {
  useFormik,
} from 'formik';

import {
  useToast,
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
    <>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="logoUrl">
          {' '}
          *Logo image
          This image will also be used for navigation. 300 x 300 recommended.
        </label>
        <Upload
          id="logoUrl"
          mediatype="nocuttiing"
          value={formik.values.logoUrl}
          onChange={(v: any) => {
            formik.setFieldValue('url', v);
          }}
        />
        <label htmlFor="featuredUrl">
          {' '}
          Featured image
          This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of NFTMart. 600 x 400 recommended.
        </label>
        <Upload
          id="featuredUrl"
          mediatype="nocuttiing"
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
        <label htmlFor="nftMartUrl">
          {' '}
          *Name
          Only letters, numbers, and hyphens are supported,50 characters or less.
        </label>
        <input
          id="nftMartUrl"
          name="nftMartUrl"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.nftMartUrl}
        />
        <label htmlFor="description">
          {' '}
          Description
          Markdown syntax is supported. 1000 characterscters or less.
        </label>
        <input
          id="description"
          name="description"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.description}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateNft;
