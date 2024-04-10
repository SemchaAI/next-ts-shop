'use client';
import { useRef } from 'react';

import css from './productInfo.module.scss';
import { IInfo, IProduct } from '@/models/products';
import Image from 'next/image';

interface IProps {
  // productId: string;
  product: IProduct;
  infoGuard: boolean;
  thumbnailsGuard: boolean;
  gallery: string[];
}

export default function ProductInfo({
  product,
  gallery,
  infoGuard,
  thumbnailsGuard,
}: IProps) {
  const url = process.env.NEXT_PUBLIC_BASE_URL_BD;

  const swiperRef = useRef(null);
  const secSwiperRef = useRef(null);
  return (
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
              // SWIPER HAVE SOME PROBLEMS WITH HYDRATION HERE
              <swiper-slide
                key={thumbnail}
                suppressHydrationWarning
              >
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
                <h2 className={css.productInfoTitle}>{information.title}</h2>
                <p className={css.productInfoText}>{information.description}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={css.productCharTitle}>Характеристик нет</div>
      )}
    </div>
  );
}
