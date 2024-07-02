import { Metadata, ResolvingMetadata } from 'next';
import { getProduct } from '@/services/getProduct';

import ProductInfo from '@/components/entities/products/ProductInfo/ProductInfo';
import ProductInfoSkeleton from '@/components/entities/products/ProductInfo/ProductInfoSkeleton';

// import type { IServerError } from '@/models/errors';
// import type { IProduct } from '@/models/products';

import css from './productPage.module.scss';

// type DEPRECATED_TProps = {
//   params: { productId: string };
//   product: IProduct | IServerError;
// };
type TProps = {
  params: { productId: string };
};

export async function generateMetadata(
  { params }: TProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const productId = params.productId;

  // fetch data
  const product = await getProduct({ productId });

  if ('message' in product)
    return {
      title: 'Error',
      description: product.message,
    };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function Product({ params }: TProps) {
  const product = await getProduct({ productId: params.productId });

  if ('message' in product)
    return (
      <ProductInfoSkeleton
        variant="error"
        errorMessage={product.message}
      />
    );

  const infoGuard = product.info && product.info.length > 0;
  const thumbnailsGuard =
    product.thumbnails && product.thumbnails.img.length > 0;

  const gallery = thumbnailsGuard
    ? [...product.thumbnails.img, product.img]
    : product && product.img !== undefined
    ? [product.img]
    : ['src/to/placeholder.png'];

  // console.log('product', product);

  return (
    <section className={css.product}>
      <div className="wrapper">
        <ProductInfo
          product={product}
          infoGuard={infoGuard}
          gallery={gallery}
          thumbnailsGuard={thumbnailsGuard}
        />
      </div>
    </section>
  );
}
