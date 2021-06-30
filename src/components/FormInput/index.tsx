import React, { FC } from 'react';
import {
  Input,
} from '@chakra-ui/react';

interface Props {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const FormInput: FC<Props> = ({ value, onChange }) => (
  <Input
    id={value}
    name={value}
    type="text"
    height="40px"
    background="#FFFFFF"
    borderRadius="4px"
    border="1px solid #E5E5E5"
    fontSize="12px"
    fontFamily="TTHoves-Regular, TTHoves"
    fontWeight="400"
    color="#999999"
    onChange={onChange}
    value={value}
    placeholder="Username"
  />
);

export default FormInput;
