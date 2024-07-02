'use client';
import { Provider as ReduxProvider } from 'react-redux';

<<<<<<< Updated upstream
import { appStore } from '../lib/features/storesInit/appStore';
=======
import { appStore } from '@/lib/features/storesInit/appStore';
import AppInit from './AppInit';
>>>>>>> Stashed changes
import { ThemeProvider } from 'next-themes';

// import Modal from 'react-modal';
// Modal.setAppElement('body');

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={appStore}>
      <ThemeProvider defaultTheme="light">
        <AppInit>{children}</AppInit>
      </ThemeProvider>
    </ReduxProvider>
  );
}
