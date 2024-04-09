'use client';

import { useGetOneProductQuery } from '@/services/productApi';
import { useRef } from 'react';

import css from './productInfo.module.scss';
import { IInfo } from '@/models/products';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ProductInfoSkeleton from './ProductInfoSkeleton';

export default function ProductInfo() {
  const url = process.env.NEXT_PUBLIC_BASE_URL_BD;
  const location = usePathname().split('/')[2];

  const {
    data: product,
    isSuccess,
    isLoading,
  } = useGetOneProductQuery(location);
  console.log('product', product);

  const infoGuard = product?.info && product?.info.length > 0;
  const thumbnailsGuard =
    product?.thumbnails && product?.thumbnails.img.length > 0;

  const gallery = thumbnailsGuard
    ? [...product.thumbnails.img, product.img]
    : product && product.img !== undefined
      ? [product.img]
      : ['src/to/placeholder.png'];

  const swiperRef = useRef(null);
  const secSwiperRef = useRef(null);
  return (
    <>
      {isSuccess ? (
        <div className={css.productContainer}>
          <div className={css.productMain}>
            <div className={css.productMedia}>
              {thumbnailsGuard && (
                <swiper-container
                  ref={swiperRef}
                  class={css.productSwiper2}
                  direction="vertical"
                  slides-per-view="3"
                  space-between="0"
                  free-mode="true"
                  watch-slides-progress="true"
                >
                  {gallery.map((thumbnail: string) => (
                    <swiper-slide
                      className={css.productSwiperSlide}
                      key={thumbnail}
                    >
                      <Image
                        className={css.productSwiperSlideImg2}
                        priority={true}
                        width="150"
                        height="150"
                        src={url + '/' + thumbnail}
                        alt={product.title}
                      />
                    </swiper-slide>
                  ))}
                </swiper-container>
              )}

              <swiper-container
                ref={secSwiperRef}
                class={css.productSwiper}
                navigation="true"
                slides-per-view="1"
                // swiper element for thumbs-swiper need same class
                //with main swiper but with dot
                thumbs-swiper={`.${css.productSwiper2}`}
              >
                {gallery.map((thumbnail: string) => (
                  <swiper-slide key={thumbnail}>
                    <Image
                      className={css.productSwiperImg}
                      width="450"
                      height="450"
                      priority={true}
                      src={url + '/' + thumbnail}
                      alt={product.title}
                    />
                  </swiper-slide>
                ))}
              </swiper-container>
            </div>
            <div className={css.productColumn}>
              <h1 className={css.productTitle}>{product.title}</h1>
              <p className={css.productDescription}>{product.title}</p>
              <div className={css.productInfo}>
                <p className={css.productPrice}>
                  <span className={css.productInfoLabel}>Цена:</span>
                  {product.price}
                  <span>MDL</span>
                </p>
                <p className={css.productCount}>
                  <span className={css.productInfoLabel}>В наличии:</span>
                  {product.cnt}
                  <span>шт.</span>
                </p>
              </div>
            </div>
          </div>
          {infoGuard ? (
            <div className={css.productSecond}>
              <h2 className={css.productCharTitle}>Характеристики</h2>
              <div className={css.productCharacteristics}>
                {product.info.map((information: IInfo) => (
                  <div
                    key={information._id}
                    className={css.productCharacteristic}
                  >
                    <h2 className={css.productInfoTitle}>
                      {information.title}
                    </h2>
                    <p className={css.productInfoText}>
                      {information.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={css.productCharTitle}>Характеристик нет</div>
          )}
        </div>
      ) : (
        <ProductInfoSkeleton />
      )}
    </>
  );
}
