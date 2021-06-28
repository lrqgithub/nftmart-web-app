import React, { useState, useEffect } from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Box, Text, Divider } from '@chakra-ui/react';

import { renderBalanceText } from '../Balance';
import { SelectIcon } from '../../assets/icons';
import { Colors } from '../../constants';
import fetchAccount from '../../api/fetchAccount';

interface AccountProps {
  handleClick: (index: number) => Promise<void>;
  index: number;
  length: number;
  accountArr: Account[];
  InjectedAccountList: InjectedAccountWithMeta[]
}

const Account = ({
  handleClick, index, length, accountArr, InjectedAccountList,
}: AccountProps) => {
  const account = accountArr && accountArr[index];
  return (
    <>
      {account && (
        <Box
          key={account.address}
          height="80px"
          padding="20px"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          onClick={() => handleClick(index)}
          cursor="pointer"
        >
          <Box display="inline-block">
            <Text fontWeight="medium">{InjectedAccountList[index].meta.name}</Text>
            <Text color={Colors.TextGray}>{account.address}</Text>
          </Box>
          {account && <Box display="inline-block">{account.balance}</Box>}
          <Box display="inline-block" as="img" src={SelectIcon.default} w="32px" h="32px" />
        </Box>
      )}
      {index !== length - 1 && <Divider />}
    </>
  );
};

interface AccountListProps {
  InjectedAccountList: InjectedAccountWithMeta[];
  handleClick: (index: number) => Promise<void>;
}

const AccountList: React.FC<AccountListProps> = ({ InjectedAccountList, handleClick }) => {
  const [accountArr, setAccountArr] = useState<Account[]>();

  useEffect(() => {
    const resArr: Account[] = [];
    const fetchBalances = async () => {
      await Promise.all(
        InjectedAccountList.map(async (account) => {
          const res = await fetchAccount(account.address);
          resArr.push(res as any);
        }),
      );
      setAccountArr(resArr);
    };
    fetchBalances();
  }, [InjectedAccountList]);

  return (
    <>
      {InjectedAccountList.map((account, index) => (
        <Account
          key={account.address}
          handleClick={handleClick}
          accountArr={accountArr}
          index={index}
          length={InjectedAccountList.length}
          InjectedAccountList={InjectedAccountList}
        />
      ))}
    </>
  );
};

export default AccountList;
