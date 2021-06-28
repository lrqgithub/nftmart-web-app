import React, { FC, MouseEventHandler } from 'react';
import {
  Box, Button, HTMLChakraProps,
} from '@chakra-ui/react';

type StatusSelectorProps = {
  statusArr: string[],
  selectedArr: string[],
  handleSelect: MouseEventHandler<HTMLButtonElement>
} & HTMLChakraProps<'div'>

const StatusSelector: FC<StatusSelectorProps> = (({ selectedArr, statusArr, handleSelect }) => (
  <Box w="220px" display="flex" flexFlow="row wrap" justifyContent="space-between">
    {statusArr.map((status) => (

      <Button
        mt="10px"
        width="105px"
        height="40px"
        background={selectedArr.indexOf(status) > -1 ? '#000000' : '#FFFFFF'}
        borderRadius="4px"
        key={status}
        id={status}
        onClick={handleSelect}
        colorScheme="teal"
        fontSize="14px"
        fontFamily="PingFangTC-Regular, PingFangTC"
        fontWeight="400"
        color={selectedArr.indexOf(status) > -1 ? '#FFFFFF' : '#000000'}
        variant={selectedArr.indexOf(status) > -1 ? 'solid' : 'outline'}
        // _hover={{ background: '#000000', color: '#FFFFFF' }}
        _focus={{
          border: 'none',
          textDecoration: 'none',
        }}
      >
        {status}
      </Button>
    ))}
  </Box>
));

export default StatusSelector;
