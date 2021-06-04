export * from './Colors';

export const NAV_MAP: Record<string, string> = {
  'nav.home': '/',
  'nav.explore': '/explore',
  'nav.list-sale': '/explore?status=listing',
  // 'nav.latest-create': '/explore?status=new',
  // 'nav.latest-strike': '/explore?status=recent',
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
