'use client';
import { useAppSelector } from '@/lib/hooks';
import ErrorNotification from './ErrorNotification';

export default function ErrorSection() {
  const { errors } = useAppSelector((state) => state.errors);
  return (
    <section>
      <ErrorNotification errors={errors} />
    </section>
  );
}
