'use client';
//types
import type { IProduct } from '@/models/products';
// libs
import Link from 'next/link';
import Image from 'next/image';

import { PRODUCT_ROUTE } from '@/lib/utils/consts';

//css
import css from './productCard.module.scss';
import ProductControls from '@/components/features/ProductControls/ProductControls';

export default function ProductCard({ product }: { product: IProduct }) {
  const url = process.env.NEXT_PUBLIC_BASE_URL_BD;

  return (
    <li className={css.product}>
      <Link
        className={css.productLink}
        href={`${PRODUCT_ROUTE}/${product._id}`}
      >
        <Image
          className={css.productImg}
          width={200}
          height={200}
          sizes="(max-width: 768px) 200px"
          priority={true}
          src={url + `/` + product.img}
          alt={product.description}
        />
        <h2 className={css.productTitle}>{product.title}</h2>
      </Link>
      <div className={css.productInfo}>
        <div className={css.productContainer}>
          <div className={css.productPriceLabel}>Price:</div>
          <p className={css.productPrice}>{product.price}MDL</p>
        </div>
        {/* <div className={css.productControls}>
          {outOfStock ? (
            <div className={css.outOfStockContainer}>
              <p className={css.productText}>Out of stock</p>
              <OutOfStock className={css.productBtnContainer} />
            </div>
          ) : (
            <div className={css.productBtnsContainer}>
              <button
                onClick={() =>
                  FavoriteHandler({
                    userId,
                    productId,
                  })
                }
                className={css.productBtnContainer}
                aria-label="Add/delete from favorite"
              >
                <FavoriteIcon className={`${css.favoriteIcon} ${favorClass}`} />
              </button>
              <button
                onClick={() =>
                  CartHandler({
                    userId,
                    productId,
                  })
                }
                className={css.productBtnContainer}
                aria-label="Add/ delete from cart"
              >
                {isProductInCart ? <BtnClose /> : <BtnPlus />}
              </button>
            </div>
          )}
        </div> */}
        <ProductControls product={product} />
      </div>
    </li>
  );
}
