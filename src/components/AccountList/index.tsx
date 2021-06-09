import React, { useState, useEffect } from 'react';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { Box, Text, Divider } from '@chakra-ui/react';

import { BalanceType, renderBalanceText } from '../Balance';
import { SelectIcon } from '../../assets/icons';
import { Colors } from '../../constants';
import { getBalance } from '../../polkaSDK/api/getBalance';

interface AccountProps {
  account: InjectedAccountWithMeta;
  handleClick: (index: number) => Promise<void>;
  index: number;
  length: number;
  balanceArr: BalanceType[] | undefined;
}

const Account = ({
  account, handleClick, index, length, balanceArr,
}: AccountProps) => {
  const { address, meta } = account;
  const { name } = meta;
  const balance = balanceArr && balanceArr[index];

  return (
    <>
      <Box
        key={address}
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
          <Text fontWeight="medium">{name}</Text>
          <Text color={Colors.TextGray}>{address}</Text>
        </Box>
        {balance && <Box display="inline-block">{renderBalanceText(balance?.free)}</Box>}
        <Box display="inline-block" as="img" src={SelectIcon.default} w="32px" h="32px" />
      </Box>
      {index !== length - 1 && <Divider />}
    </>
  );
};

interface AccountListProps {
  list: InjectedAccountWithMeta[];
  handleClick: (index: number) => Promise<void>;
}

const AccountList: React.FC<AccountListProps> = ({ list, handleClick }) => {
  const [balanceArr, setBalanceArr] = useState<BalanceType[]>();

  useEffect(() => {
    const resArr: BalanceType[] = [];
    const fetchBalances = async () => {
      await Promise.all(
        list.map(async (account) => {
          const res = await getBalance(account.address);
          resArr.push(res.toHuman() as any);
        }),
      );
      setBalanceArr(resArr);
    };
    fetchBalances();
  }, [list]);

  return (
    <>
      {list.map((account, index) => (
        <Account
          key={account.address}
          account={account}
          handleClick={handleClick}
          balanceArr={balanceArr}
          index={index}
          length={list.length}
        />
      ))}
    </>
  );
};

export default AccountList;
