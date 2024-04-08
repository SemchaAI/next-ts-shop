'use client';
import Link from 'next/link';
import css from './homeBanner.module.scss';
import ChevronLeft from '@/components/icons/ChevronLeft';
import ChevronRight from '@/components/icons/ChevronRight';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import type { SwiperContainer } from 'swiper/element/bundle';
import type { SwiperOptions } from 'swiper/types';

export default function HomeBanner() {
  // swiper web component with init="false" for 04.04.24 isnt good decision
  // BIG CLS because next/react doesnt wait for init container and render all slides in column
  const swiperRef = useRef<SwiperContainer>(null);

  useEffect(() => {
    const swiperContainer = swiperRef.current;
    // params obj send to utils>consts file
    const params: SwiperOptions = {
      navigation: {
        // ############################################################
        // be careful with dots that mistake can cost you a lot of time
        nextEl: `.${css.swiperNext}`,
        prevEl: `.${css.swiperPrev}`,
      },
      slidesPerView: 1,
      spaceBetween: 0,
      pagination: {
        el: `.${css.pagination}`,
        // FOR BULLETS YOU DON'T NEED DOTS CHECK RENDER FUNCTION
        bulletClass: `${css.bullet}`,
        bulletActiveClass: `${css.bulletActive}`,
        clickable: true,
        renderBullet(_, className) {
          return `<span class="${className}"></span>`;
        },
      },
      loop: true,
      a11y: {
        enabled: true,
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        id: 'homeBanner',
      },
    };

    if (swiperContainer) {
      Object.assign(swiperContainer, params);
      swiperContainer.initialize();
    }
  }, []);

  return (
    <div className={css.swiperContainer}>
      <swiper-container
        slides-per-view="1"
        ref={swiperRef}
        init="false"
        // className={css.bannerSwiper}
      >
        <swiper-slide>
          <Link href="/">
            <picture>
              <source
                srcSet="/banners/Xiaomi_14_mi-desktop.webp"
                type="image/webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/banners/Xiaomi_14_mi-tablet.webp"
                type="image/webp"
                media="(min-width: 768px)"
              />
              <source
                srcSet="/banners/Xiaomi_14_mi-mobile.webp"
                type="image/webp"
                media="(min-width: 479px)"
              />
              <Image
                priority={true}
                alt="Xiaomi 14 mi desktop"
                src="/banners/Xiaomi_14_mi-desktop.webp"
                width={1340}
                height={560}
              />
            </picture>
          </Link>
        </swiper-slide>
        <swiper-slide>
          <Link href="/">
            <picture>
              <source
                srcSet="/banners/Xiaomi_14_mi-desktop.webp"
                type="image/webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/banners/Xiaomi_14_mi-tablet.webp"
                type="image/webp"
                media="(min-width: 768px)"
              />
              <source
                srcSet="/banners/Xiaomi_14_mi-mobile.webp"
                type="image/webp"
                media="(min-width: 479px)"
              />
              <Image
                priority={true}
                alt="Xiaomi 14 mi desktop"
                src="/banners/Xiaomi_14_mi-desktop.webp"
                width={1340}
                height={560}
              />
            </picture>
          </Link>
        </swiper-slide>
        <swiper-slide>
          <Link href="/">
            <picture>
              <source
                srcSet="/banners/Xiaomi_14_mi-desktop.webp"
                type="image/webp"
                media="(min-width: 1024px)"
              />
              <source
                srcSet="/banners/Xiaomi_14_mi-tablet.webp"
                type="image/webp"
                media="(min-width: 768px)"
              />
              <source
                srcSet="/banners/Xiaomi_14_mi-mobile.webp"
                type="image/webp"
                media="(min-width: 479px)"
              />
              <Image
                priority={true}
                alt="Xiaomi 14 mi desktop"
                src="/banners/Xiaomi_14_mi-desktop.webp"
                width={1340}
                height={560}
              />
            </picture>
          </Link>
        </swiper-slide>
      </swiper-container>
      <div className={css.pagination}></div>
      <button
        aria-hidden="true"
        className={`${css.swiperPrev} ${css.swiperNav}`}
      >
        <ChevronLeft className={css.chevron} />
      </button>
      <button
        aria-hidden="true"
        className={`${css.swiperNext} ${css.swiperNav}`}
      >
        <ChevronRight className={css.chevron} />
      </button>
    </div>
  );
}
