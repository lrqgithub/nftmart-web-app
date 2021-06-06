export * from './Colors';
export * from './Polka';

export const NAV_MAP: Record<string, string> = {
  'nav.home': '/',
  'nav.browing': '/explore',
  'nav.list-sale': '/explore?status=listing',
  'nav.auction': '/auction',
  'nav.active': '/active',
};

export const USER_LINKS: Record<string, string> = {
  'quick-area.wallet': '/wallet',
  'quick-area.collections': '/collections',
  'quick-area.nft.create': '/create',
  // 'quick-area.profile.edit': '/profile',
};

export const Z_INDEXES = {
  // popover's index - 1
  header: 9,
  typeFilter: 9,
  banner: 8,
};
