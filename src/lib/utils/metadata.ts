import { Metadata } from 'next';

export const metaHomeLayout: Metadata = {
  title: 'Next ts shop',
  description: 'Micro frontend example of shop on next 14',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/nextjs-light.ico',
        href: '/nextjs-light.ico',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/nextjs-dark.ico',
        href: '/nextjs-dark.ico',
      },
    ],
  },
};
