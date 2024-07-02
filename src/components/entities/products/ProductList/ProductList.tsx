'use client';
import { useGetProductsQuery } from '@/services/productApi';
import css from './productList.module.scss';
import { IProduct } from '@/models/products';
import ProductCard from '../ProductCard/ProductCard';
import { useAppSelector } from '@/lib/utils/hooks';

import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';
// import ProductsPagination from '@/components/features/pagination/ProductsPagination';
import ProductsPaginationSkeleton from '@/components/features/pagination/skeleton/ProductPaginationSkeleton';
import Pagination from '@/components/features/pagination/Pagination';
import { useState } from 'react';

export default function ProductList() {
  // limit of products on page
  const limit = 3;
  const [page, setPage] = useState<number>(1);
  const PageHandler = (i: number) => {
    setPage(i);
  };

  const { selectedType, title } = useAppSelector((state) => state.product);
  const { data, isFetching, isSuccess } = useGetProductsQuery(
    {
      selectedType: selectedType._id,
      limit,
      page,
      title,
    },
    {
      refetchOnMountOrArgChange: true,
      // skip: !selectedType._id,
    }
  );

  if (isFetching) {
    return (
      <>
        <ul className={css.productsList}>
          {[...Array(limit)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </ul>
        <ProductsPaginationSkeleton />
      </>
    );
  }
  if (isSuccess && data.products.length === 0) {
    return <div className={css.zeroProducts}>Not found</div>;
  }
  if (isSuccess) {
    return (
      <>
        <ul className={css.productsList}>
          {data.products.map((product: IProduct) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </ul>
        {/* <ProductsPagination /> */}
        <Pagination
          pageHandler={PageHandler}
          page={page}
          total={data.total}
        />
      </>
    );
  }
}
