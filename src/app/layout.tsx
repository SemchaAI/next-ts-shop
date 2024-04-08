import type { Metadata } from 'next';
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
    <html suppressHydrationWarning>
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
        </Providers>
      </body>
    </html>
  );
}
