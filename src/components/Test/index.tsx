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

const TestLATIONS: Record<string, string> = {
  textone: 'Text',
  texttwo: 'Texttwo',
};

const Test = (): JSX.Element => {
  const { t } = useTranslation();

  const [text, settext] = useState('textone');
  const [opening, setOpening] = useState(false);

  const handleSelecttext = (l: string) => {
    settext(l);
    setOpening(false);
  };

  // Link render helper
  const renderButton = (title: string, idx: string | number | null | undefined) => {
    const path = TestLATIONS[title];

    return (
      <Button key={idx} variant="ghost" onClick={() => handleSelecttext(title)}>
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
        <Stack direction="row" cursor="pointer" alignItems="center" spacing={0}>
          <Text fontSize="12px" pr="3px">{t(TestLATIONS[text])}</Text>
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
        <PopoverContent maxWidth="100px" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody display="flex" justifyContent="center">
            <Stack paddingY={2}>{Object.keys(TestLATIONS).map(renderButton)}</Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default Test;
