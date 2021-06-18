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

const TRANSLATIONS: Record<string, string> = {
  en: 'langEn',
  zh: 'langZn',
};

const ChangeLanguage = (): JSX.Element => {
  const { i18n, t } = useTranslation();

  const [lang, setLang] = useState(i18n.language || 'en');
  const [opening, setOpening] = useState(false);

  const handleSelectLang = (l: string) => {
    setLang(l);
    i18n.changeLanguage(l);
  };

  // Link render helper
  const renderButton = (title: string, idx: string | number | null | undefined) => {
    const path = TRANSLATIONS[title];

    return (
      <Button key={idx} variant="ghost" onClick={() => handleSelectLang(title)}>
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
          <Text pr="3px">{t(TRANSLATIONS[lang])}</Text>
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
            <Stack paddingY={2}>{Object.keys(TRANSLATIONS).map(renderButton)}</Stack>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default ChangeLanguage;
