'use client';
import { useEffect, useState, useTransition } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { useAppSelector } from '@/lib/utils/hooks';
import {
  useCheckRateMutation,
  useCreateRateMutation,
  useUpdateRateMutation,
} from '@/services/productApi';

import { Min5 } from '@/lib/utils/validationObjects';

import MainBtn from '@/components/shared/buttons/MainBtn';
import Star from '@/components/shared/icons/star/Star';
import { MainInput } from '@/components/shared/inputs/MainInput';

import type { IFormRate } from '@/models/forms';

import css from './sendRate.module.scss';
import { useRouter } from 'next/navigation';
import action from '@/app/actions';

export default function SendRate({ productId }: { productId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isLoading },
  } = useForm<IFormRate>({
    mode: 'onBlur',
  });
  const router = useRouter();

  const { user } = useAppSelector((state) => state.user);

  const [isPending, startTransition] = useTransition();
  const [createRating] = useCreateRateMutation();
  const [updateRating] = useUpdateRateMutation();

  // CHECK IF RATED
  const [checkRate, { data }] = useCheckRateMutation();
  const [isRated, setIsRated] = useState<boolean>(false);
  useEffect(() => {
    async function fetchData() {
      if (user.id) {
        const res = await checkRate({
          userId: user.id,
          productId,
        });
        if (res.data) {
          setIsRated(res.data.success);
        }
      }
    }
    fetchData();
  }, [checkRate, productId, user.id]);
  //------------------------------------------------

  const [starRate, setStarRate] = useState<number>(0);
  const [starRateHover, setStarRateHover] = useState<number>(0);
  const starClass = (e: number): 'default' | 'half' | 'full' => {
    if (starRateHover !== 0 && e <= starRateHover) {
      return 'full';
    }
    if (e <= starRate) {
      return 'full';
    }
    return 'default';
  };

  const submitHandler: SubmitHandler<IFormRate> = async (data) => {
    console.log('formData', { ...data, productId, userId: user.id });
    if (data.rate > 0 && user.id) {
      if (isRated) {
        console.log('isRated', isRated, data.rate);
        await updateRating({
          ...data,
          productId,
          userId: user.id,
        });
      } else {
        await createRating({
          ...data,
          productId,
          userId: user.id,
        });
      }
      startTransition(async () => {
        // isnt good if marketplace have a lot of units
        //mb better to revalidate just by time
        // Revalidate at most after 1 hour { next: { revalidate: 3600 } }
        await action();
        router.refresh();
      });
    }
  };

  if (!user.id)
    return (
      <section className={css.sectionSkeleton}>
        <p className={css.textSkeleton}>Log In or Register to Comment</p>
      </section>
    );

  // if (isRated) {
  //   return (
  //     <section className={css.sectionSkeleton}>
  //       <p className={css.textSkeleton}>Thank you for your comment</p>
  //     </section>
  //   );
  // }

  return (
    <section className={css.sendRateSection}>
      <div className={css.sectionContainer}>
        <h3 className={css.title}>{isRated ? 'Update Rate' : 'Send Rate'}</h3>
        <form
          className={css.form}
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className={css.field}>
            <div className={css.ratingRow}>
              {[1, 2, 3, 4, 5].map((e) => (
                <div key={e}>
                  <label
                    onMouseOver={() => setStarRateHover(e)}
                    onClick={() => setStarRate(e)}
                    onMouseLeave={() => setStarRateHover(0)}
                    htmlFor={`star-${e}`}
                  >
                    <Star
                      width={20}
                      height={20}
                      className={starClass(e)}
                    />
                  </label>
                  <input
                    style={{ display: 'none' }}
                    {...register('rate', { required: true })}
                    type="radio"
                    value={e}
                    id={`star-${e}`}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={css.field}>
            <div>
              <label
                className={css.label}
                htmlFor="type"
              >
                Message:
              </label>
            </div>
            <MainInput
              {...register('message', Min5)}
              error={errors.message}
              placeholder="Message...(not required)"
              id="type"
            />
          </div>
          <div className={css.modalControls}>
            <MainBtn
              disabled={!isValid}
              type="submit"
              version="contain"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </MainBtn>
          </div>
        </form>
      </div>
    </section>
  );
}
