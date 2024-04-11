import { useTranslations } from 'next-intl';
import SearchInput from '@/components/inputs/SearchInput';

import css from './homePage.module.scss';
import ProductList from '@/components/products/ProductList/ProductList';
import SidebarTypes from '@/components/sidebar/SidebarTypes';
import HomeBanner from '@/components/sliders/homeBanner/HomeBanner';

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// export const metadata: Metadata = {
//   title: 'Next ts shop | Home',
//   description: 'Micro frontend example of shop on next 14',
// };
export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function Home() {
  const t = useTranslations('home');
  return (
    <section className={css.products}>
      <div className="wrapper">
        <HomeBanner />
        <div className={css.productsContainer}>
          <h1 className={css.productsTitle}>{t('title')}</h1>
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
