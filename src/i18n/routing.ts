import { defineRouting } from 'next-intl/routing';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export const locales = ['az', 'en', 'ru', 'ko'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales: ['az', 'en', 'ru', 'ko'],
  defaultLocale: 'az',
  localePrefix: 'always'
});

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation(routing);
