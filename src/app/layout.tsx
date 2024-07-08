import type { Metadata } from 'next';
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
              paddingBottom: '40px',
            }}
          >
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <ErrorSection />
          </main>
          <MainFooter />
        </Providers>
      </body>
    </html>
  );
}
