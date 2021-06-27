import React, { FC, MouseEventHandler } from 'react';
import {
  Stack, Button, HTMLChakraProps,
} from '@chakra-ui/react';

type CategorySelectorProps = {
  list: Category[],
  selectId: string,
  handleSelect: MouseEventHandler<HTMLButtonElement>
} & HTMLChakraProps<'div'>

const CategorySelector: FC<CategorySelectorProps> = (({ list, selectId, handleSelect }) => (
  <Stack direction="row">
    {list.map((category) => (
      <Button
        key={category.id}
        id={category.id}
        colorScheme="teal"
        variant={selectId === category.id ? 'solid' : 'outline'}
        onClick={handleSelect}
      >
        {category.name}
      </Button>
    ))}
  </Stack>
));

export default CategorySelector;
