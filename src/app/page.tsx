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
  );
}
