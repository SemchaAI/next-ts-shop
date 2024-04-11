'use client';
import MainBtn from '@/components/buttons/MainBtn';
import css from './assets/error.module.scss';
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={css.error}>
      <h2 className={css.title}>Something went wrong!</h2>
      <p className={css.message}>{error.message}</p>
      <MainBtn
        version="outline"
        onClick={() => reset()}
      >
        Try again
      </MainBtn>
    </div>
  );
}
