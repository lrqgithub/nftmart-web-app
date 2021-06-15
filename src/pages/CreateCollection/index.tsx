import React, {
  FC, useCallback, useRef, useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Button,
  Center,
  Flex,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  Formik, Form, Field, FormikProps,
} from 'formik';
import * as Yup from 'yup';
import LoginDetector from '../../components/LoginDetector';
import CheckWhiteList from '../../components/CheckWhiteList';

import Upload from '../../components/Upload';

import Layout from '../../layouts/common';
import { Colors } from '../../constants';

import { getBalance } from '../../polkaSDK/api/getBalance';
import { createClass } from '../../polkaSDK/api/createClass';

import { useMyAssetsQuery } from '../../hooks/reactQuery/useMyAssetsQuery';
import { useMyCollectionsQuery } from '../../hooks/reactQuery/useMyCollectionsQuery';
import { useAppSelector } from '../../hooks/redux';

const formLabelLayout = {
  flex: '0 0 240px',
  height: '48px',
  htmlFor: 'name',
  fontSize: '14px',
  color: Colors.Gray,
  borderBottom: '1px solid #F3F4F8',
  mb: '0',
  mr: '0',
  lineHeight: '47px',
};
const formInputLayout = {
  variant: 'flushed',
  size: 'lg',
  fontSize: '14px',
  borderBottomColor: '#F3F4F8',
};

const CreateCollection: FC = () => {
  const { t } = useTranslation();
  const toast = useToast();

  const stateAll = useAppSelector((state) => state.chain);

  const { account } = stateAll;
  const { refetch: refetchAssets } = useMyAssetsQuery(account ? account.address : '');
  const { refetch: refetchMyCollections } = useMyCollectionsQuery(account ? account.address : '');

  const create = useCallback((formValue, cb) => {
    createClass({ address: account.address, metadata: formValue, cb });
  }, []);

  const schema = Yup.object().shape({
    name: Yup.string()
      .max(20, t('createVerificationCollectionName'))
      .required(t('createVerificationRequired')),
    url: Yup.string().max(200).required(t('createVerificationRequired')),
    externalUrl: Yup.string().matches(
      /(http|https):\/\/([\w.]+\/?)\S*/,
      t('createVerificationExternalUrl'),
    ),
    description: Yup.string()
      .max(200, t('createVerificationDescription'))
      .required(t('createVerificationRequired')),
  });

  const history = useHistory();
  const cancelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const brr = JSON.parse(localStorage.getItem('collection'));
  const crr = brr;

  return (
    <>
      <Layout title="title.create-collection">
        <Box padding={2}>
          <Container
            width="880px"
            minHeight="100vh"
            backgroundColor="#fff"
            mt="20px"
            mb="148px"
            borderRadius="4px"
          >
            <Box
              height="48px"
              borderBottom="1px solid #E9E9F0"
              pl="20px"
              fontWeight="600"
              fontSize="16px"
              lineHeight="47px"
              color={Colors.Black}
            >
              {t('createCollectionTitle')}
            </Box>
            <Container p="0 20px">
              <Formik
                initialValues={{
                  name: crr ? crr.name : '',
                  // bannerUrl: '',
                  description: crr ? crr.description : '',
                  url: crr ? crr.url : '',
                  externalUrl: crr ? crr.externalUrl : '',
                }}
                onSubmit={(values, formActions) => {
                  const arr = values;
                  localStorage.setItem('collection', JSON.stringify(arr));
                  create(values, {
                    success: (err: any) => {
                      if (err.dispatchError) {
                        toast({
                          title: 'error',
                          status: 'error',
                          position: 'top',
                          duration: 3000,
                          description: t('createCreateError'),
                        });
                      } else {
                        toast({
                          title: 'success',
                          status: 'success',
                          position: 'top',
                          duration: 3000,
                        });
                        localStorage.removeItem('collection');
                        setTimeout(() => {
                          setIsOpen(true);
                          // history.push('/create');
                        }, 2000);
                      }
                      formActions.setSubmitting(false);
                      formActions.resetForm();
                      refetchAssets();
                      refetchMyCollections();
                      getBalance(account.address);
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
                      refetchAssets();
                      refetchMyCollections();
                      getBalance(account.address);
                    },
                  });
                }}
                validationSchema={schema}
              >
                {(props: FormikProps<any>) => (
                  <Form>
                    <Field name="name">
                      {({
                        field,
                        form,
                      }: {
                          field: Record<any, unknown>;
                          form: { errors: { name: string }; touched: { name: string } };
                        }) => (
                          <FormControl isInvalid={!!(form.errors.name && form.touched.name)}>
                            <Flex>
                              <FormLabel {...formLabelLayout} htmlFor="name">
                                {t('createName')}
                              </FormLabel>
                              <Input
                                id="name"
                                placeholder={t('createNameCollectionPlaceholder')}
                                {...formInputLayout}
                                {...field}
                              />
                            </Flex>
                            <FormErrorMessage pl="240px">{form.errors.name}</FormErrorMessage>
                          </FormControl>
                      )}
                    </Field>
                    <Field>
                      {({
                        field,
                        form,
                      }: {
                          field: Record<any, unknown>;
                          form: { errors: { url: string }; touched: { url: string } };
                        }) => (
                          <FormControl isInvalid={!!(form.errors.url && form.touched.url)}>
                            <Flex>
                              <FormLabel
                                {...formLabelLayout}
                                p="10px 0"
                                lineHeight="auto"
                                height="auto"
                              >
                                {t('createImg')}
                              </FormLabel>
                              <FormLabel
                                mb="0"
                                flexGrow={1}
                                  // htmlFor="url"
                                borderBottom="1px solid #F3F4F8"
                              >
                                <Upload
                                  id="url"
                                  mediatype="cutting"
                                  {...field}
                                  onChange={(v: any) => {
                                    props.setFieldValue('url', v);
                                  }}
                                />
                              </FormLabel>
                            </Flex>
                            <FormErrorMessage pl="240px">{form.errors.url}</FormErrorMessage>
                          </FormControl>
                      )}
                    </Field>
                    {/* <Field name="url">
                      {({
                        field,
                        form,
                      }: {
                        field: Record<string, unknown>;
                        form: { errors: { url: string }; touched: { url: string } };
                      }) => {
                        return (
                          <FormControl isInvalid={!!(form.errors.url && form.touched.url)}>
                            <Flex>
                              <FormLabel {...formLabelLayout} htmlFor="url">
                                {t('create.url')}
                              </FormLabel>
                              <Input
                                id="url"
                                placeholder={t('create.url.placeholder')}
                                {...field}
                                {...formInputLayout}
                              />
                            </Flex>
                            <FormErrorMessage pl="240px">{form.errors.url}</FormErrorMessage>
                          </FormControl>
                        );
                      }}
                    </Field> */}
                    <Field name="externalUrl">
                      {({
                        field,
                        form,
                      }: {
                          field: Record<string, unknown>;
                          form: {
                            errors: { externalUrl: string };
                            touched: { externalUrl: string };
                          };
                        }) => (
                          <FormControl
                            isInvalid={!!(form.errors.externalUrl && form.touched.externalUrl)}
                          >
                            <Flex>
                              <FormLabel {...formLabelLayout} htmlFor="externalUrl">
                                {t('createLink')}
                              </FormLabel>
                              <Input
                                id="externalUrl"
                                placeholder={t('createLinkPlaceholder')}
                                {...formInputLayout}
                                {...field}
                              />
                            </Flex>
                            <FormErrorMessage pl="240px">
                              {form.errors.externalUrl}
                            </FormErrorMessage>
                          </FormControl>
                      )}
                    </Field>
                    <Field name="description">
                      {({
                        field,
                        form,
                      }: {
                          field: Record<string, unknown>;
                          form: {
                            errors: { description: string };
                            touched: { description: string };
                          };
                        }) => (
                          <FormControl
                            isInvalid={!!(form.errors.description && form.touched.description)}
                          >
                            <Flex>
                              <FormLabel {...formLabelLayout} height="96px" htmlFor="description">
                                {t('createIntro')}
                              </FormLabel>
                              <Textarea
                                _placeholder={{ color: Colors.LightGray }}
                                id="description"
                                placeholder={t('createIntroPlaceholder')}
                                height="96px"
                                resize="none"
                                {...formInputLayout}
                                {...field}
                              />
                            </Flex>
                            <FormErrorMessage pl="240px">
                              {form.errors.description}
                            </FormErrorMessage>
                          </FormControl>
                      )}
                    </Field>
                    <Center mt="20px">
                      <Button
                        type="submit"
                        backgroundColor={Colors.Primary}
                        fontSize="14px"
                        color="#fff"
                        isLoading={props.isSubmitting}
                        _hover={{ backgroundColor: Colors.Primary }}
                        _focus={{ backgroundColor: Colors.Primary }}
                      >
                        {t('createSave')}
                      </Button>
                    </Center>
                  </Form>
                )}
              </Formik>
            </Container>
          </Container>
        </Box>

        <LoginDetector />
        <CheckWhiteList />
      </Layout>

      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{t('createCreateSuccess')}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{t('createToastSuccess')}</AlertDialogBody>
          <AlertDialogFooter>
            <Button bg="#495FE5" color="#FFFFFF" ml={3} onClick={() => history.push('/create')}>
              {t('createPopupConfirm')}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default CreateCollection;
