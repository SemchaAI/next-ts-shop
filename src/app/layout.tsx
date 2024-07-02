import type { Metadata } from 'next';
<<<<<<< Updated upstream
import { Inter } from 'next/font/google';

import { Providers } from './providers';
import { MainHeader } from '@/components/headers/MainHeader';
import MainFooter from '@/components/footers/MainFooter';
import './assets/main.scss';
import { metaHomeLayout } from '@/lib/utils/metadata';
import ErrorSection from '@/components/error/ErrorSection';

// will add in future this method for load fonts
// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = metaHomeLayout;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
    >
      {/*  className={inter.className} */}
      <body>
        <Providers>
          <MainHeader />
          <main
            style={{
              flexGrow: 1,
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {children}
          </main>
          <MainFooter />
          <ErrorSection />
=======
// import { Inter } from 'next/font/google';
import { Providers } from './providers';

import Header from '@/components/widgets/header/Header';
import ErrorSection from '@/components/widgets/error/ErrorSection';
import MainFooter from '@/components/widgets/footer/MainFooter';

import { metaHomeLayout } from '@/lib/utils/metadata';
import './assets/main.scss';
import { Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = metaHomeLayout;

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Header />
          <main
            style={{
              // flexGrow: 1,
              // position: 'relative',
              // display: 'flex',
              // flexDirection: 'column',
              gridArea: `main`,
            }}
          >
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <ErrorSection />
          </main>
          <MainFooter />
>>>>>>> Stashed changes
        </Providers>
      </body>
    </html>
  );
}
