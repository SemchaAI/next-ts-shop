'use client';
import type { IRate } from '@/models/products';
import { useGetProductRatesQuery } from '@/services/productApi';
import { usePathname } from 'next/navigation';
import RateCard from '../RateCard/RateCard';

import css from './rateList.module.scss';
import Pagination from '@/components/features/pagination/Pagination';
import { useState } from 'react';
import LoadingSpinner from '@/components/shared/loading/LoadingSpinner';

export default function RateList() {
  const productId = usePathname().split('/').pop();
  const [page, setPage] = useState(1);
  const PageHandler = (i: number) => {
    setPage(i);
  };

  const { data, isFetching, isSuccess } = useGetProductRatesQuery(
    {
      productId: productId || '',
      page: page,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  if (isSuccess) {
    return (
      <div className={css.rateListContainer}>
        <h3 className={css.rateTitle}>Reviews</h3>
        <ul className={css.rateList}>
          {data.ratings.map((rate: IRate) => (
            <li key={rate._id}>
              <RateCard {...rate} />
            </li>
          ))}
        </ul>
        {data.ratings.length === 0 && (
          <div className={css.zeroProducts}>No reviews</div>
        )}
        {data.ratings.length > 0 && (
          <div className={css.paginationContainer}>
            <Pagination
              pageHandler={PageHandler}
              page={page}
              total={data.total}
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <div className={css.rateListContainer}>
      <LoadingSpinner />
    </div>
  );
}
