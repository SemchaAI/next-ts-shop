import {
  Pathnames,
  createLocalizedPathnamesNavigation,
} from 'next-intl/navigation';

export const locales = ['en', 'ru'] as const;
export const localePrefix = 'always'; // Default
export const pathnames = {
  '/': '/',
  '/cart': '/cart',
  '/favorites': '/favorites',
  '/admin': '/admin',
  '/login': '/login',
  // check  async rewrites() in next.config.mjs
  '/register': '/register',

  '/product/[productId]': '/product/[productId]',
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({ locales, localePrefix, pathnames });
