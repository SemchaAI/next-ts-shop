'use client';
import { useAppDispatch, useAppSelector } from '@/lib/utils/hooks';
import ErrorNotification from './ErrorNotification';
import { useEffect } from 'react';
import { deleteError } from '@/stores/errors.slice';

export default function ErrorSection() {
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector((state) => state.errors);
  useEffect(() => {
    if (errors) {
      errors.forEach((error) => {
        if (!error.critical) {
          setTimeout(() => {
            dispatch(deleteError(error.id));
          }, 10000);
        }
      });
    }
  }, [errors, dispatch]);
  return (
    <section>
      <ErrorNotification errors={errors} />
    </section>
  );
}
