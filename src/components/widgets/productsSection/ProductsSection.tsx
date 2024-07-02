import ProductList from '@/components/entities/products/ProductList/ProductList';
import css from './productsSection.module.scss';
import SearchInput from '@/components/shared/inputs/SearchInput';
import SidebarTypes from '@/components/features/sidebar/SidebarTypes';

export default function ProductsSection() {
  return (
    <section className={css.products}>
      <div className="wrapper">
        <div className={css.productsContainer}>
          <h1 className={css.productsTitle}>All products</h1>
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
