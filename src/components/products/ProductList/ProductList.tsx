'use client';
import { useGetProductsQuery } from '@/services/productApi';
import css from './productList.module.scss';
import { IProduct } from '@/models/products';
import ProductCard from '../ProductCard/ProductCard';
import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';
import { useAppSelector } from '@/lib/hooks';
import ProductsPagination from '@/components/pagination/ProductsPagination';
export default function ProductList() {
  // limit of products on page
  const limit = 3;
  const { selectedType, page, title } = useAppSelector(
    (state) => state.product
  );
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

  console.log('productList');

  if (isFetching) {
    return (
      <ul className={css.productsList}>
        {[...Array(limit)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </ul>
    );
  }
  if (isSuccess && data.products.length === 0) {
    return <div className={css.zeroProducts}>Ничего не найдено</div>;
  }

  return (
    <>
      {isSuccess && (
        <>
          <ul className={css.productsList}>
            {data.products.map((product: IProduct) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </ul>
          <ProductsPagination />
        </>
      )}
    </>
  );
}
