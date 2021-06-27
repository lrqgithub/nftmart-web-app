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
  <Box display="flex" flexDirection="row">
    {statusArr.map((status) => (

      <Button
        key={status}
        id={status}
        onClick={handleSelect}
        colorScheme="teal"
        variant={selectedArr.indexOf(status) > -1 ? 'solid' : 'outline'}
      >
        {status}
      </Button>
    ))}
  </Box>
));

export default StatusSelector;
