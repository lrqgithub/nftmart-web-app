import { Link as RouterLink } from 'react-router-dom';
import {
  Text, Link, HTMLChakraProps, LinkProps, Box,
} from '@chakra-ui/react';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Colors } from '../../constants';

export interface NLinkProps extends HTMLChakraProps<'p'> {
  path: string;
  title: string;
  active?: boolean;
  bordered?: boolean;
  linkProps?: LinkProps;
}

const NLink: FC<NLinkProps> = (props) => {
  const { t } = useTranslation();
  const {
    path, title, active = false, bordered = false, linkProps, ...restStyles
  } = props;

  const borderBottom = {
    content: '" "',
    height: 1,
    width: '80%',
    borderRadius: 3,
    position: 'absolute',
    backgroundColor: Colors.Primary,
    left: '50%',
    bottom: -2,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <>
      <Text
        fontSize={16}
        _hover={{
          color: Colors.Primary,
        }}
        position="relative"
        {...restStyles}
      >
        <Link
          outline="none"
          as={RouterLink}
          key={title}
          to={path}
          color={active ? Colors.Primary : ''}
          _after={active && bordered ? borderBottom : {}}
          _hover={{
            textDecoration: 'none',
          }}
          _focus={{
            border: 'none',
            textDecoration: 'none',
          }}
          {...linkProps}
        >
          {t(title)}
        </Link>
      </Text>

    </>
  );
};

export default NLink;
