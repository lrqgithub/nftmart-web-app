import React, { useState } from 'react';
import {
  Stack,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Button,
  Text,
  Image,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
} from '../../assets/images';

const SortByLATIONS: Record<string, string> = {
  textone: 'Sort By',
  texttwo: 'Recently Created',
};

const SortBy = (): JSX.Element => {
  const { t } = useTranslation();

  const [text, settext] = useState('textone');
  const [opening, setOpening] = useState(false);

  const handleSelecttext = (l: string) => {
    settext(l);
    setOpening(false);
  };

  // Link render helper
  const renderButton = (title: string, idx: string | number | null | undefined) => {
    const path = SortByLATIONS[title];

    return (
      <Button
        display="flex"
        justifyContent="flex-start"
        key={idx}
        variant="ghost"
        fontSize="14px"
        fontFamily="TTHoves-Regular, TTHoves"
        fontWeight="400"
        color="#191A24"
        onClick={() => handleSelecttext(title)}
      >
        {t(path)}
      </Button>
    );
  };

  return (
    <Popover
      placement="bottom"
      size="sm"
      variant="menu"
      isOpen={opening}
      onOpen={() => setOpening(true)}
      onClose={() => setOpening(false)}
    >
      <PopoverTrigger>
        <Stack
          width="180px"
          height="36px"
          background="#FFFFFF"
          borderRadius="20px"
          border="1px solid #999999"
          direction="row"
          cursor="pointer"
          alignItems="center"
          justifyContent="space-between"
          p="0 20px"
          spacing={0}
        >
          <Text fontSize="12px" pr="3px">{t(SortByLATIONS[text])}</Text>
          {opening ? (
            <Image
              width="12px"
              height="12px"
              src={IoMdArrowDropup.default}
            />
          ) : (
            <Image
              width="12px"
              height="12px"
              src={IoMdArrowDropdown.default}
            />
          )}
        </Stack>
      </PopoverTrigger>
      <Portal>
        {/* TODO: Move focus property else where to have common use */}
        <PopoverContent width="180px" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody display="flex" justifyContent="center">
            <Stack
              paddingY={2}
            >
              {Object.keys(SortByLATIONS).map(renderButton)}

            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default SortBy;
