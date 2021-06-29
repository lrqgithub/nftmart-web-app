// theme.js
import { extendTheme, ThemeOverride } from '@chakra-ui/react';

// Global style overrides
import styles from './styles';

import colors from './colors';
import Link from './components/link';
import Container from './components/container';

const overrides: ThemeOverride = {
  colors,
  // colorMode config
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles, // global style
  // Other foundational style overrides go here
  components: {
    Link,
    Container,
    // Other components go here
  },
};

export default extendTheme(overrides);
