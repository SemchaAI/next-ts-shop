'use client';

import { useRouter, usePathname } from '@/navigation';
import { useParams } from 'next/navigation';
import { ChangeEvent, ReactNode, useTransition } from 'react';
type Props = {
  children: ReactNode;
  defaultValue: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <select
      className=""
      defaultValue={defaultValue}
      disabled={isPending}
      onChange={onSelectChange}
    >
      {children}
    </select>
  );
}
