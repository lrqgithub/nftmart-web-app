import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  Box,
} from '@chakra-ui/react';
import NLink from '../Link';
import { NAV_MAP } from '../../constants';
import { useAppSelector } from '../../hooks/redux';

const NavLink = () => {
  const location = useLocation();
  const chainState = useAppSelector((state) => state.chain);
  const { account } = chainState;
  let filtedNav = NAV_MAP;
  if (!account) {
    filtedNav = NAV_MAP.filter((nav) => nav.requiredLogin === false);
  }
  return (
    <>
      {filtedNav.map((nav, index) => {
        const routePath = location.pathname + location.search;
        const active = routePath === nav.path;

        return (
          <>
            <NLink
              border="0"
              outline="none"
              title={nav.title}
              path={nav.path}
              active={active}
              bgSize="cover"
              fontWeight="bold"
              marginRight="12px"
              marginLeft="28px"
              bordered
              key={nav.title}
            />
            <Box
              w="16px"
              h="17px"
              borderTop="1px solid #999"
              transform="rotate(114deg)"
              display={index === NAV_MAP.length - 1 ? 'none' : ''}
            />
          </>
        );
      })}
    </>
  );
};

export default NavLink;
