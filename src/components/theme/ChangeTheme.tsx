'use client';
import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

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

  return <button onClick={onClick}>{theme}</button>;
}
