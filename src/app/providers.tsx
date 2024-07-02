'use client';
import { Provider as ReduxProvider } from 'react-redux';

import { appStore } from '@/lib/features/storesInit/appStore';
import AppInit from './AppInit';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={appStore}>
      <ThemeProvider defaultTheme="light">
        <AppInit>{children}</AppInit>
      </ThemeProvider>
    </ReduxProvider>
  );
}
