<<<<<<< Updated upstream
// import ProductList from '@/components/products/ProductList/ProductList';
// import SidebarTypes from '@/components/sidebar/SidebarTypes';
import SearchInput from '@/components/inputs/SearchInput';

import css from './homePage.module.scss';
import ProductList from '@/components/products/ProductList/ProductList';
import SidebarTypes from '@/components/sidebar/SidebarTypes';
import HomeBanner from '@/components/sliders/homeBanner/HomeBanner';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Next ts shop | Home',
  description: 'Micro frontend example of shop on next 14',
};

export default function Home() {
  return (
    <section className={css.products}>
      <div className="wrapper">
        <HomeBanner />
        <div className={css.productsContainer}>
          <h1 className={css.productsTitle}>Все товары</h1>
          <div className={css.productsBlock}>
            <SidebarTypes />
            <div className={css.productsWrapper}>
              <SearchInput />

              <div className="verify">
                <ProductList />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
=======
import HeaderBanner from '@/components/entities/HeaderBanner/HeaderBanner';
import ProductsSection from '@/components/widgets/productsSection/ProductsSection';
import type { EmblaOptionsType } from 'embla-carousel';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next ts shop | Home',
  description: 'Home page of micro ts shop on next 14',
};

export default function Home() {
  const OPTIONS: EmblaOptionsType = {};
  const SLIDES = [
    {
      id: 1,
      imgSrc: {
        desktop: '/banner/summer-banner.webp',
        tablet: '/banner/summer-banner-tablet.webp',
        mobile: '/banner/summer-banner-mobile.webp',
      },
      base64:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      alt: 'banner1',
      width: 1340,
      height: 560,
      priority: true,
      href: '/',
    },
    {
      id: 2,
      imgSrc: {
        desktop: '/banner/summer-banner.webp',
        tablet: '/banner/summer-banner-tablet.webp',
        mobile: '/banner/summer-banner-mobile.webp',
      },
      base64:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      alt: 'banner1',
      width: 1340,
      height: 560,
      priority: true,
      href: '/',
    },
    {
      id: 3,
      imgSrc: {
        desktop: '/banner/summer-banner.webp',
        tablet: '/banner/summer-banner-tablet.webp',
        mobile: '/banner/summer-banner-mobile.webp',
      },
      base64:
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
      alt: 'banner1',
      width: 1340,
      height: 560,
      priority: true,
      href: '/',
    },
  ];
  return (
    <>
      <HeaderBanner
        slides={SLIDES}
        options={OPTIONS}
      />
      <ProductsSection />
    </>
>>>>>>> Stashed changes
  );
}
