import React, { FC, MouseEventHandler } from 'react';
import {
  Stack, Button, HTMLChakraProps,
} from '@chakra-ui/react';

type CollectionSelectorProps = {
  collectionArr: Collection[],
  selectedArr: string[],
  handleSelect: MouseEventHandler<HTMLButtonElement>
} & HTMLChakraProps<'div'>

const CollectionSelector: FC<CollectionSelectorProps> = (({ selectedArr, collectionArr, handleSelect }) => (
  <Stack direction="column">
    {collectionArr.map((collection) => (
      <Button
        key={collection.name}
        id={collection.name}
        onClick={handleSelect}
        colorScheme="teal"
        variant={selectedArr.indexOf(collection.name) > -1 ? 'solid' : 'outline'}
      >
        {collection.name}
      </Button>
    ))}
  </Stack>
));

export default CollectionSelector;
