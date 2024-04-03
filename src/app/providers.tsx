'use client';
import { Provider as ReduxProvider } from 'react-redux';

import { appStore } from '../lib/features/storesInit/appStore';
import { ThemeProvider } from 'next-themes';

// import { AuthProvider } from 'acme-auth';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={appStore}>
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    </ReduxProvider>
  );
}
