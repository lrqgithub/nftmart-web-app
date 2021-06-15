import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { redirectConnect } from '../../utils';

const LoginDetector = () => {
  const location = useLocation();
  const history = useHistory();
  const stateAll = useSelector((state:any) => state.chain);
  const { accounts, account, injector } = stateAll;

  useEffect(() => {
    const flag = !accounts || accounts.length === 0 || !account || !injector;

    if (flag) {
      redirectConnect(location.pathname, history);
    }
  }, [accounts, account, injector]);

  return <></>;
};

export default LoginDetector;
