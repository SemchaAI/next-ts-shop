'use client';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Moon from '@/components/shared/icons/Moon';
import Sun from '@/components/shared/icons/Sun';

import css from './changeTheme.module.scss';

export function ChangeTheme() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setTheme(theme === 'light' ? 'dark' : 'light');
    },
    [theme]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  //'🌙' : '☀️'
  return (
    <button
      className={css.theme}
      onClick={onClick}
    >
      {theme === 'light' ? <Moon /> : <Sun />}
    </button>
  );
}
