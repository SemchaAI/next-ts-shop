import { Metadata } from 'next';

import css from './cartPage.module.scss';
import CartPanel from '@/components/widgets/cartPanel/CartPanel';

export const metadata: Metadata = {
  title: 'Next ts shop | Cart',
  description: 'Cart page of shop on next 14',
};

export default function CartPage() {
  return (
    <section className={css.cart}>
      <div className="wrapper">
        <div className={css.cartContainer}>
          <h1 className={css.cartTitle}>Cart</h1>
          <CartPanel />
        </div>
      </div>
    </section>
  );
}
