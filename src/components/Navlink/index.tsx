import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  Box,
} from '@chakra-ui/react';
import NLink from '../Link';
import { NAV_MAP } from '../../constants';

const NavLink = () => {
  const location = useLocation();

  const renderLink = (title: string) => {
    const path = NAV_MAP[title];
    const routePath = location.pathname + location.search;

    const isExplore = path === '/explore' && (/^\/?explore\/?$/.test(routePath) || location.search.includes('all'));
    const active = routePath === path;

    return (
      <>
        <NLink
          border="0"
          outline="none"
          title={title}
          path={path}
          active={isExplore || active}
          bgSize="cover"
          fontWeight="bold"
          marginRight="12px"
          marginLeft="28px"
          bordered
          key={title}
        />
        <Box
          w="16px"
          h="17px"
          borderTop="1px solid #999"
          transform="rotate(114deg)"
          display={title === 'navActive' ? 'none' : ''}
        />
      </>
    );
  };

  return <>{Object.keys(NAV_MAP).map(renderLink)}</>;
};

export default NavLink;
