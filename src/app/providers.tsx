'use client';
import { Provider as ReduxProvider } from 'react-redux';

import { appStore } from '../lib/features/storesInit/appStore';
import { ThemeProvider } from 'next-themes';

import { register } from 'swiper/element/bundle';
register();

import Modal from 'react-modal';
Modal.setAppElement('body');

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={appStore}>
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    </ReduxProvider>
  );
}
